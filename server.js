require("dotenv").config();
require("./config/db_connection"); // database initial setup

const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request (var instead of hardcoded)

// CUSTOM MIDDLEWARE
// check if user is logged in... 
// usecases : conditional display in hbs templates
// WARNING: this function must be declared AFTER the session setup
// WARNING: this function must be declared BEFORE app.use(router(s))
function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null; 
  // access this value @ {{user}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
}

app.use(checkloginStatus);

const basePageRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/dashboard_product");

app.use(basePageRouter);
app.use(authRouter);
app.use(productRouter);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `app started at ${process.env.SITE_URL}`
  );
});
