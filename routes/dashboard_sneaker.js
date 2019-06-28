const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerApi = require("../api/api_sneaker");


router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res) => {
  return console.log(req.body)
  // res.render("products_add");
});

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

router.get("/product-edit", (req, res) => {
  res.render("product_edit");
});


module.exports = router  