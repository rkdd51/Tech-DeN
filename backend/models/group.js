const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const groupSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
