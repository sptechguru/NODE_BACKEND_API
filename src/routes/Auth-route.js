const express = require("express");
const router = express.Router();



router.post("/register", async (req, res) => {
    try {
        console.log("Register Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
});



router.post("/login", async (req, res) => {
    try {
        res.send("login Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
});



router.post("/logout", async (req, res) => {
    try {
        res.send("logout Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
});



router.post("/2fa/setup", async (req, res) => {
    try {
        res.send("stup2FaAuth Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
});



router.post("/verify", async (req, res) => {
    try {
        res.send("verfy Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
}
);

router.post("/reset/2fa", async (req, res) => {
    try {
        res.send("reset2Fa Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
});


router.get("/status", async (req, res) => {
    try {
        res.send("authStatus Route is Activated is Running");
    }
    catch (error) {
        res.status(501).send({
            message: "Server Error",
            error: error,
        });
    }
});


module.exports = router;
