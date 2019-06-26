require("dotenv").config();
require("./config/db_connection"); // database initial setup

const express = require("express");
const hbs = require("hbs");
const app = express();

app.locals.site_url = process.env.SITE_URL; // used in front end to perform ajax request on a url var instead of hardcoding it

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

app.get(["/", "/home"], (req, res) => { // clbk parameters are mandatory
  res.render("index");
});

app.get("/prod-add", (req, res) => { // clbk parameters are mandatory
  // res.send("<h1>hello world</h1>");
  res.render("products_add");
});
app.get("/prod-manage", (req, res) => { // clbk parameters are mandatory
  res.render("products_manage");
});

app.get("/signup", (req, res) => { // clbk parameters are mandatory
  res.render("signup");
});

app.get("/login", (req, res) => { // clbk parameters are mandatory
  res.render("login");
});

app.get("/one-product", (req, res) => { // clbk parameters are mandatory
  res.render("one_product");
});


const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `app started at ${process.env.SITE_URL}`
  );
});
