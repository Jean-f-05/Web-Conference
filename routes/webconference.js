const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {validateAtendee,validateMessage} = require("../utils/middleware");
const webconference = require("../controllers/webconference");

// const AppError = require("../utils/appError");
// const User = require('../models/user');

router.route("/")
  .get(catchAsync(webconference.index))
  .post(validateAtendee,catchAsync(webconference.attendeeregistration));
  
router.post("/attendeeMsg",validateMessage,catchAsync(webconference.attendeemessage));



module.exports = router;