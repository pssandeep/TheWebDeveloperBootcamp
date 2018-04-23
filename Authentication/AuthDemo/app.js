const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");

const User = require("./models/user");
const app = express();
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

mongoose.connect("mongodb://localhost/auth_demo");

app.use(require("express-session")({
   secret : "a" ,
   resave : false,
   saveUninitialized : false
}));
app.use(urlencodedParser);
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// All Routes

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    console.log("SECRET ROUTE")
    res.render("secret");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login",
    passport.authenticate("local", {
        successRedirect : "/secret",
        failureRedirect : "/login",
        failureFlash :true
    })
);

app.get("/register", (req,res) => {
    res.render("register")
});

app.post("/register", (req,res) => {
    User.register(new User({username : req.body.username}), req.body.password, (err,user) => {
        if(err){
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req,res, () => {
            console.log("REGISTER POST ROUTE");
            res.redirect("/secret");
        });
    });
});
app.listen("3000", () => console.log("Server started at port #3000..."));