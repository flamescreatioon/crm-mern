const express = require('express');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async(req, res) => {
    try {
        const customer = new Customer({...req.body, createdBy: req.userId});
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/', auth, async(req, res) =>{
    try {
        const customers = await Customer.find({createdBy: req.userId});
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.put("/:id", auth, async(req, res) => {
    try {
        const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;