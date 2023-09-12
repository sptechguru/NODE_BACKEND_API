
const express = require("express");
const router = new express.Router();
const User = require("./user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");


router.post('/signup', (req, res, next) => {
    console.log("signup route called......");
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({
                error: error
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })

            user.save().then((result) => {
                console.log("new user ", result);
                res.status(201).json({
                    data: result,
                })
            })
                .catch((error) => {
                    console.log("new user Error ", error);

                    res.status(500).json({
                        error: error
                    })
                });
        }
    })
})


router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'User Not Exist'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        message: 'Password are Incorrect'
                    })
                }
                if (result) {
                    const tokenKey = jwt.sign({
                        username: user[0].username,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone,
                    }, 'this is dummy text',
                        {
                            expiresIn: '24 Hours'
                        });  // passing secretKey & Token Expired

                    res.status(200).json({
                        username: user[0].username,
                        userType: user[0].userType,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: tokenKey
                    })
                }
            })

        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })
})



router.get("/all-details", async (req, res) => {
    try {
        const users = await User.find();
        console.log("get All User data", users);
        res.status(201).send({
            success: true,
            message: "User details found.",
            data: users
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "User details not Found ",
            // data:user
        });
    }
});



module.exports = router;




