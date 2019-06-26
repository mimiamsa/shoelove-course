const express = require("express");
const router = new express.Router();

router.get("/prod-add", (req, res) => {
  res.render("products_manage");
});

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

module.exports = router;
