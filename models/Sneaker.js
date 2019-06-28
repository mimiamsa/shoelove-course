const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sneakerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
  },
  description: {
    type: String,
  },
  sizes: {
    type: Array
  },
  price: {
    type: Number
  },
  category: {
    type: Array,
    enum: [men, women, kids]
  },
  id_tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Palette"
    }
  ],
  image: {
    type: String,
    default: "./../public/medias/img/shoe.png"
  }

});

const skeakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = skeakerModel;

