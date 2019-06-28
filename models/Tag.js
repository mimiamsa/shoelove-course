const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
