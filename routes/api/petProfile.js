const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const PetProfile = require("../../models/PetProfile");
const auth = require("../../middleware/auth");

// @route   GET api/petProfile
// @desc    Get all pet profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    let petProfiles = await PetProfile.find().populate("user", ["name", "avatar"]);

    res.json(petProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error!");
  }
});

// @route GET api/petProfile/me
// @desc Get current pet profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const petProfile = await PetProfile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

    if (!petProfile) {
      return res.status(400).json({ msg: "No pet profile found for this user" });
    }

    res.json(petProfile);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error!");
  }
});

// @route GET api/petProfile/:user_id
// @desc Get a pet profile by certain user id
// @access Private
router.get("/:user_id", auth, async (req, res) => {
  try {
    const petProfile = await PetProfile.findOne({ user: req.params.user_id });

    if (!petProfile) {
      return res.status(400).json({ msg: "No pet profile found for this user" });
    }

    res.json(petProfile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No pet profile found for this user" });
    }

    res.status(500).send("Server Error!");
  }
});

// @route POST api/petProfile
// @desc Create or update a pet profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("age", "Age is required").not().isEmpty(),
      check("breed", "Breed is required").not().isEmpty(),
      check("gender", "Gender is required").not().isEmpty(),
      check("characteristics", "Characteristics are required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, breed, gender, characteristics, location, description, youtube, twitter, facebook, instagram } = req.body;

    // Pet Profile Object
    let petProfileObj = {};

    petProfileObj.user = req.user.id;
    if (name) petProfileObj.name = name;
    if (age) petProfileObj.age = age;
    if (breed) petProfileObj.breed = breed;
    if (gender) petProfileObj.gender = gender;
    if (characteristics) {
      petProfileObj.characteristics = characteristics
        .toString()
        .split(",")
        .map((skill) => skill.trim());
    }
    if (location) petProfileObj.location = location;
    if (description) petProfileObj.description = description;

    // Pet Profile SNS Object
    petProfileObj.social = {};
    if (youtube) petProfileObj.social.youtube = youtube;
    if (twitter) petProfileObj.social.twitter = twitter;
    if (facebook) petProfileObj.social.facebook = facebook;
    if (instagram) petProfileObj.social.instagram = instagram;

    try {
      let petProfile = await PetProfile.findOne({ user: req.user.id });

      // Update Profile
      if (petProfile) {
        petProfile = await PetProfile.findOneAndUpdate({ user: req.user.id }, { $set: petProfileObj }, { new: true });

        return res.json(petProfile);
      }

      // Create Profile
      petProfile = new PetProfile(petProfileObj);

      await petProfile.save();
      res.send(petProfile);
    } catch (err) {
      console.error(err.message);

      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
