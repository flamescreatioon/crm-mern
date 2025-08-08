const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Input validation helper
const validateInput = (name, email, password) => {
    const errors = [];
    
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.push('Please enter a valid email');
    }
    
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    
    return errors;
};

router.post('/register', async (req, res) => {
    // Add debugging
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    
    // Check if req.body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            message: 'Request body is empty. Please send JSON data with Content-Type: application/json' 
        });
    }

    const { name, email, password } = req.body;
    
    // Validate input
    const validationErrors = validateInput(name, email, password);
    if (validationErrors.length > 0) {
        return res.status(400).json({ 
            message: 'Validation failed', 
            errors: validationErrors 
        });
    }
    
    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ 
            name: name.trim(), 
            email: email.toLowerCase(), 
            password: hashedPassword 
        });
        
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors 
            });
        }
        
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    // Add debugging
    console.log('Content-Type:', req.get('Content-Type'));
    
    // Check if req.body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            message: 'Request body is empty. Please send JSON data with Content-Type: application/json' 
        });
    }

    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ 
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;