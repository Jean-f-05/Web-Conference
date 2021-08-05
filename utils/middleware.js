const {atendeeSchema,messageSchema, speakerSchema} = require("./schemas");
const AppError = require("./appError");

module.exports.validateAtendee = (req,res,next)=>{
    const {error} = atendeeSchema.validate(req.body);
      if(error){
    const msg = error.details.map(el=>el.message).join(",")
      throw new AppError(msg, 400)
    }else{
        next()
    }
  }


module.exports.validateMessage = (req,res,next)=>{
    const {error} = messageSchema.validate(req.body);
      if(error){
    const msg = error.details.map(el=>el.message).join(",")
      throw new AppError(msg, 400)
    }else{
        next()
    }
  }

  module.exports.isLoggedIn =   (req,res,next) => {
    if (!req.isAuthenticated()){
      req.flash("error","You should login...")
      return res.redirect("/webconference")
    }
    next();  
  }

  module.exports.validateSpeaker = (req,res,next)=>{
    const {error} = speakerSchema.validate(req.body);
    if (error) {
      const msg = error.details.map(el=>el.message).join(",")
      throw new AppError(msg, 400)
    }else{
        next()
    }
  }
