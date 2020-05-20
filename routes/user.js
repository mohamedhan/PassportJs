const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//Get all useers

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
//express validator
const valid = (req, res, next) => [
  check("name", "name is required").not().isEmpty(),
  check("email", "please include a valid email ").isEmail(),
  check(
    "password",
    "please enter a password with 8 or more carateres"
  ).isLength({ min: 6 }),
];
// const validHandler=(req,res,next)=>{
//     const errors=validationResult
// }
//register user
router.post("/", valid(), (req, res) => {
 

  const { name, email, password } = req.body;

  //test if user already exist
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exissts" }] });
      }

      const newUser = new User({
        name,
        email,
        password,
      });
      // crypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, salt) => {
          newUser.password = password;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    })

    .catch((err) => res.status(500).send("erreur server:"));
});
module.exports = router;
