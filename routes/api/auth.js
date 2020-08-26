const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/authMiddleware");


// Checking The Token if Avaialable
router.get("/", auth, async (req, res) => {
  try {
//     console.log(req,"Hi")
//  res.json({user:true})
    // const user = await User.findById(req.user.id).select('-password');
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// Logging User
router.post("/", async (req, res) => {
  const admins = [
    {
      email: "user",
      password: "123",
    },
  ];

  const { email, password } = req.body;
  try {
    admins.map((admin) => {
      if (email == admin.email && password == admin.password) {
        //JsonWebToken

        const mail = {
          user: {
            id: admin.email,
          },
        };
        jwt.sign(mail, "JWTSECRET", { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token, mail });
        });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
