const passport = require('passport')
const Attendee = require("../models/attendees");
const Speaker = require("../models/speakers");
const Sponsor = require("../models/sponsors");
const {storage, cloudinary} = require("../cloudinary");


module.exports.authentication =
    passport.authenticate('local', { 
        successRedirect: '/admins',
        failureRedirect: '/webconference',
        failureFlash: true
  });


module.exports.renderAttendees = 
    async(req,res) => {
    const attendees = await Attendee.find({});
    res.render("./admins/admins",{attendees})
    }; 

module.exports.logout = 
    (req,res)=>{
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/webconference")
  };

  module.exports.deleteAttendee =
    async(req,res)=>{
    const deleteAttendee = await Attendee.findByIdAndDelete(req.body.id);
    if(deleteAttendee){
        req.flash("success","Attendee deleted...")
        res.redirect("/admins")
    }else{
        req.flash("error", "Sorry, we couldn't deleted that user...")
        res.redirect("/admins")
        }
    };

    //ATTENDEE ROUTES

module.exports.renderSpeakers = 
    async(req,res)=>{
    const speakers = await Speaker.find({});
    res.render("admins/speakers",{speakers})
    };

module.exports.addSpeaker = 
    async(req,res)=>{
    const {path:url, filename} = req.file;
    const speaker = new Speaker(req.body);    
    speaker.photo = {url, filename};
    await speaker.save();
    req.flash("success","You added a new speaker...")
    res.redirect("/admins/speakers")
  };

module.exports.deleteSpeaker =
    async(req,res)=>{
    const {speakerFileName} = req.body;
    await cloudinary.uploader.destroy(speakerFileName);
    const toDeleteSpeaker = await Speaker.find({"photo.filename":speakerFileName});
    const deletedSpeaker = await Speaker.findByIdAndDelete(toDeleteSpeaker);
        if(deletedSpeaker){
        req.flash("success","Speaker deleted...")
        res.redirect("/admins/speakers")
      }else{
        req.flash("error", "Ups, something went wrong...")
        res.redirect("/admins/speakers")
      }
  };

  module.exports.renderUpdateSpeaker = 
    (async(req,res)=>{
    const {id} = req.params;
    const speaker = await Speaker.findById(id);
    res.render("./admins/renderEditSpeaker",{speaker})
  });

  module.exports.updateSpeaker = (async(req,res)=>{
    const {id} = req.params;
    const speaker = await Speaker.findByIdAndUpdate(id,{...req.body})
    if(!req.file){
      const speakerPhoto = await Speaker.findById(id);
      speaker.photo = speakerPhoto.photo
      await speaker.save();
      req.flash("success","Updated Speaker...")
      res.redirect("/admins/speakers")
    }else{
      const speakerPhoto = await Speaker.findById(id);
      speaker.photo = speakerPhoto.photo
      await cloudinary.uploader.destroy(speakerPhoto.photo.filename);
      const {path:url, filename} = req.file;
      speaker.photo = {url, filename};
      await speaker.save()
      req.flash("success","Updated Speaker...")
      res.redirect("/admins/speakers")
    }
  });

    //SPONSORS ROUTES

module.exports.renderSponsor =
    async(req,res)=>{
    const sponsors = await Sponsor.find({}); 
    res.render("./admins/sponsors",{sponsors})
    };

module.exports.addSponsor = 
    async(req,res)=>{
    const {path:url, filename} = req.file;
    const newSponsor = await new Sponsor(req.body)
    newSponsor.image = {url, filename};
    await newSponsor.save();
    if(newSponsor){
      req.flash("success","Added Sponsor...")
      res.redirect("/admins/sponsors")
    }else{
      req.flash("error", "Ups, something went wrong...")
      res.redirect("/admins/sponsors")
    }
      };

module.exports.deleteSponsor=
    async(req,res)=>{
    const {sponsorFileName} = req.body;
    await cloudinary.uploader.destroy(sponsorFileName);
    const toDeleteSponsor = await Sponsor.find({"image.filename":sponsorFileName});
    const deletedSponsor = await Sponsor.findByIdAndDelete(toDeleteSponsor);
        if(deletedSponsor){
            req.flash("success","Sponsor deleted...")
            res.redirect("/admins/sponsors")
        }else{
            req.flash("error", "Ups, something went wrong...")
            res.redirect("/admins/sponsors")
        }
      };