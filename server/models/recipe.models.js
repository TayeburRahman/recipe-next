const mongoose = require("mongoose");

// model step: 1
const recipeModel = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: [true, "name is require"],
    },
    label: {
      type: String,
      required: [true, "label is require"],
    },
    description: {
      type:  String,
      required: [true, "description is require"],
    },
    image: {
      type: String,
      required: [true, "image is require"],
    },
    time: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipes", recipeModel);
