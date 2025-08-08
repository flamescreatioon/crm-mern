const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const customerRoutes = require("./routes/customer");
dotenv.config();


const app = express();

// Middleware - order is important!
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Add limit for larger payloads
app.use(express.urlencoded({ extended: true })); // Add URL-encoded parsing

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes); 
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URI;

mongoose.connect(MONGO_URL)
.then(()=>{
  console.log("MongoDB connected successfully");
}).catch((err)=>{
  console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
  res.send("CRM backend is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
