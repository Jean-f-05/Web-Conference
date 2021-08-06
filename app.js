if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}


const express = require('express');
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require('ejs');
const AppError = require("./utils/appError")
const atendeesRoutes = require("./routes/webconference.js")
const adminsRoutes = require("./routes/admins")
const authenticationRoutes = require("./routes/authentication")
const session = require('express-session')
const flash = require('connect-flash');
const User = require('./models/user');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const MongoStore = require('connect-mongo');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/webConference';


mongoose.connect(dbUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to DB WebConference")
});


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

app.use(methodOverride('_method'));
app.use(mongoSanitize());

const secret = process.env.SECRET || "thisisdevelopementmode"

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret
  }
});

const sessionConfig = {
  store,
  name:"webConfId",
  secret,
  resave: false,
  saveUninitialized:true.valueOf,
    cookie:{
      httpOnly:true,
      expires: Date.now() + 604800000 ,
      maxAge:  604800000
  }
}


app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({
  contentSecurityPolicy: false,
}));

//PASSPORT LOCAL AUTH
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
})

//ROUTES 
app.use("/webconference",atendeesRoutes)
app.use("/admins", adminsRoutes)
app.use("/authentication", authenticationRoutes)

app.get("/",(req,res)=>{
  res.redirect("/webconference")
})

app.all("*", (req,res,next)=>{
  next(new AppError("Page not found!",404))
})


app.use((err,req,res,next)=>{
  const {status=500} = err;
  if(!err.message) err.message = "Ups, something went wrong!"
  res.status(status).render("error", {err})
})
const port = process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log(`Hosted on port ${port}`)
})