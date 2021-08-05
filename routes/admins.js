const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {isLoggedIn,validateSpeaker} = require("../utils/middleware")
const {storage, cloudinary} = require("../cloudinary");
const multer  = require('multer');
const upload = multer({ storage});
const admin = require("../controllers/admins")
const catchAsync = require("../utils/catchAsync");



//ATTENDEE ROUTES
router.route("/")
  .get(isLoggedIn, catchAsync(admin.renderAttendees))
  .delete(isLoggedIn, catchAsync(admin.deleteAttendee))
  .post(catchAsync(admin.authentication))

//LOGOUT ROUTE
router.get("/logout", admin.logout)

//SPEAKERS ROUTES
router.route("/speakers")
  .get(isLoggedIn, catchAsync(admin.renderSpeakers))
  .post(upload.single('photo'), validateSpeaker, isLoggedIn, catchAsync(admin.addSpeaker))
  .delete(isLoggedIn, catchAsync(admin.deleteSpeaker))
  

  router.route("/speakers/:id")
    .get(isLoggedIn,catchAsync(admin.renderUpdateSpeaker))
    .put(upload.single('photo'),(isLoggedIn,catchAsync(admin.updateSpeaker)));



//SPONSORS ROUTES
router.route("/sponsors")
  .get(isLoggedIn, catchAsync(admin.renderSponsor))
  .post(upload.single('image'),isLoggedIn, catchAsync(admin.addSponsor))
  .delete(isLoggedIn, catchAsync(admin.deleteSponsor)); 


module.exports = router;