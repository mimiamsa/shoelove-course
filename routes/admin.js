const express = require("express");
const router = new express.Router();

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

module.exports = router;
