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
  gender: {
    type: String,
    required: true,
  },
  characteristics: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mapInfo: {
    coordinates: {
      type: String,
    },
    context: {
      type: String,
    },
  },
  lookingFor: {
    location: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    whatfor: {
      type: String,
    },
    description: {
      type: String,
    },
  },
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
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      avatar: {
        type: String,
      },
    },
  ],
  messages: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      pet: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PetProfile = mongoose.model("petprofile", PetProfileSchema);
