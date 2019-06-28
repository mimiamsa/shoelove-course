const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerApi = require("../api/api_sneaker");


router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res) => {
  // return console.log(req.body)
  const { name, ref, size, description, price, tags } = req.body
  sneakerApi.create({ name, ref, size, description, price, tags })
  .then(dbRes => {
    console.log(dbRes)
    req.session.flashMessage = {
      status: "success",
      txt: "Yes!! A new sneaker was created"
    };
  })
  .catch(dbErr => {
    console.log(dbErr)
  })
});

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

router.get("/product-edit", (req, res) => {
  res.render("product_edit");
});


module.exports = router  