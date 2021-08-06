const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const authentication = require("../controllers/authentication")

router.post("/login", passport.authenticate("local",{failureFlash:true, failureRedirect:"/webconference"}), authentication.login);

router.get("/logout", authentication.logout);

module.exports = router;