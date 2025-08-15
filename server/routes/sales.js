const express = require("express");
const router = express.Router();

router.get("/sales", (req, res) => {
  res.json([
     { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 2100 },
    { month: "Mar", sales: 800 },
    { month: "Apr", sales: 1600 },
    { month: "May", sales: 2300 },
    { month: "Jun", sales: 2000 },
    { month: "Jul", sales: 2700 },
    { month: "Aug", sales: 3000 },
    { month: "Sep", sales: 2750 },
    { month: "Oct", sales: 2300 },
    { month: "Nov", sales: 4500 },
    { month: "Dec", sales: 2700 },
  ]);
});

module.exports = router;