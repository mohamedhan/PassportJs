const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//Get all useers

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
// Validation of Input post user
// ValidationInputsRules = (req, res, next) => [
//   check("email", "this field is required !").notEmpty(),
//   check("email", "this field should be a valid email").isEmail(),
// ];

// ValidatorErrorsHandle = (req, res, next) => {
//   const errors = validationResult(req);
//   errors.isEmpty()
//     ? next()
//     : res.sendStatus(400).json({ errors: errors.array() });
// };
//register user
router.post("/", (req, res) => {
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
        // name,
        email,
        password,
      });
      // crypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    })

    .catch((err) => res.status(500).send("erreur server:"));
});

//login user
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email })
//     .then((user) => {
//       if (!user) res.status(404);
//       else {
//         bcrypt.compare(password, user.password).then((isMatched) => {
//           if (isMatched) {
//             const payload = { id: user._id, email: user.email };
//             //passport jwt
//             jwt.sign(payload, "session", { expiresIn: 3600 }, (err, token) => {
//               if (err) res.status(500).json("no token");
//               else {
//                 res.json({ token });
//               }
//             });
//           } else res.status(400).json("not matched");
//         });
//       }
//     })
//     .catch((err) => res.status(501).json("server error"));
// });
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) res.sendStatus(404);
      else {
        bcrypt
          .compare(password, user.password)
          .then((isMatched) => {
            if (isMatched) {
              const payload = { id: user._id, email: user.email };
              jwt.sign(
                payload,
                "session",
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) res.sendStatus(500);
                  else res.json({ token: token });
                }
              );
            } else {
              res.sendStatus(400);
            }
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.log("Server Error"));
});
//validate token
// router.get(
//   "/validate",
//   passport.authenticate("jwt", { session: false }, (req, res) => {
//     res.send(req);
//   })
// );
router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);
module.exports = router;
