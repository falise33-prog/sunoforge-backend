const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Payments route" }));
router.post("/stripe/webhook", (req, res) => res.json({ received: true }));

module.exports = router;
