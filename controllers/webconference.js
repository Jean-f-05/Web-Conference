const Speaker = require("../models/speakers");
const Sponsor = require("../models/sponsors");
const Atendee = require("../models/attendees");
const AtendeeMessage = require("../models/AtendeesMsgs")
const {transporter, mailOptions} = require("../utils/nodemailer")




module.exports.index = 
    async(req,res, next)=>{
    const speakers = await Speaker.find({});
    const sponsors = await Sponsor.find({});
    res.render("./webconference/home", {speakers, sponsors}) 
  }


module.exports.attendeeregistration = 
    async (req,res, next)=>{
    const atendeeRegistered = await Atendee.exists({email: req.body.email})
        if (atendeeRegistered){
            req.flash("error","Sorry, user already registered!")
            res.redirect("/webconference")
        }else{
            const newAtendee = new Atendee(req.body); 
            await newAtendee.save();
            req.flash("success","Thank you for registering!")
            mailOptions.to = req.body.email;
            await transporter.sendMail(mailOptions);
            res.redirect("/webconference")
}}

module.exports.attendeemessage =
    async(req,res,next)=>{
    const newMessage = new AtendeeMessage(req.body);
    await newMessage.save();
    req.flash("success","We'll get back to you as soon as possible!");
    mailOptions.subject = "New WebConference Comment"
    mailOptions.text = req.body.message;
    await transporter.sendMail(mailOptions);
    res.redirect("/webconference")
  }