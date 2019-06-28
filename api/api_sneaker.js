const express = require("express");
const sneakerModel = require("../models/Sneaker");
const router = new express.Router();

const create = sneakerData => {return sneakerModel.create(sneakerData)};
const getAll = () => sneakerData.find().populate("id_tag");
const getOne = id => sneakerData.findById(id).populate("id_tag");
const deleteOne = (id) => sneakerData.findOneAndDelete({ _id: id });
const updateOne = (id, data) => sneakerData.findOneAndUpdate({ _id: id }, {...data});


module.exports = {
  router,
  create,
  getAll,
  getOne,
  deleteOne,
  updateOne
}
