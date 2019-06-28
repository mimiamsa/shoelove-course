const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const User = require("./../models/User.js");

router.post("/signin", (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.render("signin", { errorMsg: "Please fill in all the fields." });
  }

  User
    .findOne({ username: user.username })
    .then(dbRes => {
      if (!dbRes)
        return res.render("signin", {
          msg: {
            text: "Bad username or password.",
            status: "error"
          }
        });

      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        return res.redirect("/prod-manage");
      } else
        return res.render("signin", {
          msg: {
            text: "Bad username or password.",
            status: "error"
          }
        });
    })
    .catch(dbErr => {
      next(dbErr);
    });
});

router.post("/signup", (req, res, next) => {
  // return console.log(req.body);

  const newUser = req.body; // so req.body contains the submited informations (out of the post)

  if (
    !newUser.firstname ||
    !newUser.lastname ||
    !newUser.email ||
    !newUser.password
  ) {
    res.render("signup", {
      msg: {
        text: "All fields are required.",
        status: "warning"
      }
    });
    return;
  } else {
    User.findOne({ email: newUser.email })
      .then(dbRes => {
        if (dbRes) {
          res.render("signup", {
            msg: {
              text: "User already exists !",
              status: "warning"
            }
          });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashed;

        User.create(newUser)
          .then(() => {
            req.session.msg = {
              text: "You signed up successfully !",
              status: "success"
            };
            res.redirect("/signin");
          })
          .catch(err => console.log(err));
      })
      .catch(dbErr => next(dbErr));
  }
});

module.exports = router;
