const express = require("express");
const sneakerModel = require("../models/Sneaker");
const router = new express.Router();

const create = sneakerData => {return sneakerModel.create(sneakerData)};

module.exports = {
  router,
  create
}
