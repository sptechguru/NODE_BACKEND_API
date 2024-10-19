const express = require('express');
const passport = require('passport');
const { authStatus, stup2FaAuth, register, login, logout, reset2Fa, verfyAuth } = require('../Controllers/auth-Controller');
const router = express.Router();

const unAuthorzied = (req, res, next) => {
 if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorzied Users" })
}

router.post("/register-2fa", register)

router.post("/login-2fa", passport.authenticate('local'), login)

router.post("/logout-2fa", logout)

router.get("/status-2fa", authStatus)


router.post("/mfa-setup-2fa", unAuthorzied, stup2FaAuth)


router.post("/mfa-verify-2fa", unAuthorzied, verfyAuth)


router.post("/mfa-reset-2fa", unAuthorzied , reset2Fa)


module.exports = router;




