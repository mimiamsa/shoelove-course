const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
// const ejs = require('ejs');

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");


app.get(["/", "/home"], (req, res) => { // clbk parameters are mandatory
  // response.send("<h1>hello world</h1>");
  res.render("index", {
    people : [
      {name: "gogo"},
      {name: "gaga"},
      {name: "gougou"},
    ]
  });
});



const listener = app.listen("8000", () => {
  console.log("app/ejs started @ http://localhost:" + listener.address().port);
})