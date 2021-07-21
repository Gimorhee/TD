const express = require("express");
const router = express.Router();
const PetProfile = require("../../models/PetProfile");
const auth = require("../../middleware/auth");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const petProfile = await PetProfile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

    if (!petProfile) {
      return res.status(400).json({ msg: "No profile found for this user" });
    }

    res.json(petProfile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error!");
  }
});

module.exports = router;
