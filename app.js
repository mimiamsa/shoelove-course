const express = require("express");
const hbs = require("hbs");
const app = express();

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

app.get(["/", "/home"], (req, res) => { // clbk parameters are mandatory
  res.render("index", {
    people : [
      {name: "gogo"},
      {name: "gaga"},
      {name: "gougou"},
    ]
  });
});

app.get("/prod-add", (req, res) => { // clbk parameters are mandatory
  // res.send("<h1>hello world</h1>");
  res.render("products_add");
});
app.get("/prod-manage", (req, res) => { // clbk parameters are mandatory
  res.render("products_manage");
});

const listener = app.listen("8000", () => {
  console.log("app/hbs started @ http://localhost:" + listener.address().port);
})