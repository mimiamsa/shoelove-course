const express = require("express");
const router = new express.Router();
const sneakerApi = require("../api/sneaker");
const tagApi = require("../api/tag");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  Promise.all([sneakerApi.getAll(req.params.cat), tagApi.getAll()])
  .then(apiRes => {
    // console.log(apiRes);
    res.render("products", {
      scripts: ["ajax_tag_filter.js"],
      sneakers: apiRes[0],
      tags: apiRes[1],
    })
  })
  .catch(dbErr => {
    console.log(dbErr);
    throw new Error(dbErr)
  })
});

router.get("/one-product/:id", (req, res) => {
  sneakerApi.getOne(req.params.id)
  .then(apiRes => {
    res.render("one_product", {sneaker: apiRes});
  })
  .catch(apiErr => {
    console.log(apiErr)
  })
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin", {msg: req.session.msg});
});

module.exports = router;
