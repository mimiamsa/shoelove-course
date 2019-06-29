const express = require("express");
const sneakerModel = require("../models/Sneaker");
const router = new express.Router();

const create = sneakerData => sneakerModel.create(sneakerData);

const getAll = cat => {
  if (cat === "collection") return sneakerModel.find().populate("id_tag");
  else return sneakerModel.find({ category: cat }).populate("id_tag");
};

const getOne = id => sneakerModel.findById(id).populate("id_tag");

const deleteOne = id => sneakerModel.findOneAndDelete({ _id: id });

const updateOne = (id, data) =>
  sneakerModel.findOneAndUpdate({ _id: id }, { ...data });

// insert one sneaker in database
router.post("/", (req, res) => {
  create(req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

// fetch all sneakers from database
router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

// fetch all sneakers from database by tag id
router.get("/tag/:tagid", (req, res) => {
  getAll({ id_tags: { $all: [req.params.tagid] } })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

// get one sneaker from database
router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(dbErr => res.send(dbErr));
});

// remove one sneaker from database
router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

// update one sneaker in database
router.patch("/:id", (req, res) => {
  updateOne(req.params.id, req.body.name)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

module.exports = {
  router,
  create,
  getAll,
  getOne,
  deleteOne,
  updateOne
};
