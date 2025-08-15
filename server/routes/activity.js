const express = require("express");
const router = express.Router();

router.get("/recent", (req, res) => {
  res.json([
    {
      _id: 1,
      type: "new_lead",
      message: "New lead added: Ethan Harper",
      timestamp: "2024-07-20",
    },
    {
      _id: 2,
      type: "lead_qualified",
      message: "Lead qualified: Olivia Bennett",
      timestamp: "2024-07-18",
    },
    {
      _id: 3,
      type: "meeting_scheduled",
      message: "Meeting scheduled with Liam Carter",
      timestamp: "2024-07-15",
    },
    {
      _id: 4,
      type: "new_lead",
      message: "New lead added: Ava Morgan",
      timestamp: "2024-07-12",
    },
    {
      _id: 5,
      type: "lead_qualified",
      message: "Lead qualified: Noah Foster",
      timestamp: "2024-07-05",
    },
     {
      _id: 5,
      type: "lead_qualified",
      message: "Lead qualified: Noah Foster",
      timestamp: "2024-07-05",
    },
  ]);
});

module.exports = router;
