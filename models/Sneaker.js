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
    type: [String],
    enum: ["men", "women", "kids"]
  },
  id_tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  image: {
    type: String,
    default: "/medias/img/shoe.png"
  }

});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;

