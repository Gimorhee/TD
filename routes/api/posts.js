const express = require("express");
const router = express.Router();

// @route GET api/prosts
// @desc Test Route
// @access Public
router.get("/", (req, res) => {
  res.send("prosts Route");
});

module.exports = router;
