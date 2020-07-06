const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//router is our express router that retrieves requests and handles it
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


// router.get("/path", (req, res) => res.json({msg: "Use json to serve some type of message"}));

// post request for /register

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // Use the validations to send the error
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    }
  });
});
//post request for /login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      // Use the validations to send the error
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        // And here:
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});




router.get("/current",passport.authenticate("jwt", { session: false }),(req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  }
);
module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDE2YTVlYThjYzlkN2JhYjc0MzU1OSIsImhhbmRsZSI6Imh1bnRlcjEyIiwiaWF0IjoxNTkzOTI5Mjc3LCJleHAiOjE1OTM5MzI4Nzd9.keSPyGXQKyuUwcLK4C7rUxh - WpY3qikwaZwbFMQ0ntQ;