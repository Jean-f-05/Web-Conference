const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {catchAsync} = require("../utils/catchAsync");
const {isLoggedIn,validateSpeaker} = require("../utils/middleware")
const {storage, cloudinary} = require("../cloudinary");
const multer  = require('multer');
const upload = multer({ storage});
const admin = require("../controllers/admins")


//ATTENDEE ROUTES
router.route("/")
  .get(isLoggedIn, admin.renderAttendees)
  .delete(isLoggedIn, admin.deleteAttendee)
  .post(admin.authentication)

//LOGOUT ROUTE
router.get("/logout", admin.logout)

//SPEAKERS ROUTES
router.route("/speakers")
  .get(isLoggedIn, admin.renderSpeakers)
  .post(upload.single('photo'), validateSpeaker, isLoggedIn, admin.addSpeaker)
  .delete(isLoggedIn, admin.deleteSpeaker)
  

  router.route("/speakers/:id")
    .get(isLoggedIn,admin.renderUpdateSpeaker)
    .put(upload.single('photo'),(isLoggedIn,admin.updateSpeaker));



//SPONSORS ROUTES
router.route("/sponsors")
  .get(isLoggedIn, admin.renderSponsor)
  .post(upload.single('image'),isLoggedIn, admin.addSponsor)
  .delete(isLoggedIn, admin.deleteSponsor); 


module.exports = router;