const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerApi = require("../api/sneaker");
const tagApi = require("../api/tag");
const uploader = require("./../config/cloudinary.js");

router.get("/prod-add", (req, res) => {
  tagApi
    .getAll()
    .then(apiRes => {
      res.render("products_add", {
        tags: apiRes,
        msg: req.session.msg,
        scripts: ["ajax_tag_form.js"]
      });
      req.session.msg = null;
    })
    .catch(err => console.log(err));
});

router.post("/prod-add", uploader.single("image"), (req, res) => {
  // return console.log(req.body)
  const { name, ref, size, description, category, price } = req.body;
  const newProduct = { name, ref, size, category, description, price };

  if (req.body.id_tags) newProduct.id_tags = [req.body.id_tags];

  if (req.file) {
    newProduct.image = req.file.secure_url;
  }
  // return console.log(newProduct)
  sneakerApi
    .create(newProduct)
    .then(dbRes => {

      req.session.msg = {
        status: "success",
        txt: "Yes!! A new sneaker was created"
      };

      res.redirect("/prod-add");
  
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.get("/prod-manage", (req, res) => {
  sneakerApi.getAll("collection")
  .then(apiRes => {
    res.render("products_manage", {
      sneakers: apiRes,
      scripts: ["ajax_dashboard_delete.js"]
    });
  })
});

router.get("/product-edit/:id", (req, res) => {
  Promise.all([sneakerApi.getOne(req.params.id), tagApi.getAll()])
  .then(apiRes => {
    res.render("product_edit", {sneaker: apiRes[0], tags: apiRes[1]})
  })
  .catch(apiErr => next(apiErr))
});

router.post("/prod-edit/:id", uploader.single("image"), (req, res) => {

  const { name, ref, size, description, category, price, tags } = req.body;
  const updatedProduct = { name, ref, size, category, description, price, tags };

  if (req.file) updatedProduct.image = req.file.secure_url;

  sneakerApi
    .updateOne(req.params.id, updatedProduct)
    .then(dbRes => {
      console.log(dbRes);
      req.session.msg = {
        status: "success",
        txt: "Yes!! Sneaker successfully updated"
      };

      res.redirect("/prod-manage");
  
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});


module.exports = router;
