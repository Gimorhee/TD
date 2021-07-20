const mongoose = require("mongoose");

const PetProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  characteristics: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  lookingFor: [
    {
      location: {
        type: String,
      },
      breed: {
        type: String,
      },
      gender: {
        type: String,
      },
      age: {
        type: String,
      },
      for: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PetProfile = mongoose.model("petprofile", PetProfileSchema);
