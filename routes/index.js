const express = require("express");
const router = new express.Router();

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get(["/collection", "/kids", "/women", "/men"], (req, res) => {
  res.render("products");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin", {msg: req.session.msg});
});

router.get("/one-product", (req, res) => {
  res.render("one_product");
});

module.exports = router;
