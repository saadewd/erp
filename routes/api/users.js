const express = require('express');
const jwt = require('jsonwebtoken')
const config = require('config');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User')
// route for registering the user

router.post('/',

    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { cnic, email, password } = req.body;
        try {
            //see if user exists
            let user = await User.findOne({ email });
            if (user) {

                res.status(400).json({ errors: [{ msg: "Users already exists" }] });
        
            }
            // creating the user if not 
            user = new User({
                cnic,
                email,
                password
            })

            // encrypt Password

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();


            //Return jasonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get("jwtSecret"),
                {
                    expiresIn: 36000
                }, (err, token) => {
                    if (err) throw err;

                    res.json({ token })
                });




        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");

        }




    }
);

module.exports = router;