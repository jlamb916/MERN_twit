const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;

// router.get("/path", (req, res) => res.json({msg: "Use json to serve some type of message"}));


