const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tagSchema = new Schema({
  name: {
    type: String,
    enum : ["still life", "human","warm", "cold", "nature"], 
    required: true,
  }
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
