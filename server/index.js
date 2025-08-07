const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes); 

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URI;

mongoose.connect(MONGO_URL, {
}).then(()=>{
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
