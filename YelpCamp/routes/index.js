var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Auth Routes

//Regiter Form
router.get("/register", (req, res) => {
    res.render("auth/register");
});

//Regiter the user
router.post("/register", (req, res) => {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("auth/register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

//Login Form
router.get("/login", (req, res) => {
    res.render("auth/login");
});


//Login User
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {

});

//Logout User
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

//home route
router.get("/", isLoggedIn, function (req, res) {

    res.render("home");
});

//Middleware functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}

//Export the router
module.exports = router;