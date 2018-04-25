var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");

//Schemas Required
var CampGround = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser);
app.set("view engine", "ejs");
app.use(express.static("public"));

//Connect to MongoDB
mongoose.connect('mongodb://localhost/YelpCamp');

//Call the Seed Function to populate the refresh the database.
seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "a",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// index route. To display all the campgrounds
app.get("/campgrounds", isLoggedIn, function (req, res) {
    CampGround.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    });

});

// All Routes

//home route
app.get("/", isLoggedIn, function (req, res) {

    res.render("home");
});

// get route to show the form to enter new camp grounds.
app.get("/campgrounds/new", isLoggedIn, function (req, res) {

    res.render("campgrounds/new");
});

//show route. Show more details about the campgrounds
app.get("/campgrounds/:id", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {
                campground: campground
            });
        }
    });

});

//post route. Add new campgrounds to database
app.post("/campgrounds", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampGround = {
        name: name,
        image: image,
        description: desc
    };

    CampGround.create(newCampGround, function (err, newlyAddedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });


});


//Comment Routes

//Comments - Add New Comments
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }

    });

});

//Comments - Create new Comments
app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                campground.comments.push(comment),
                    campground.save();
                res.redirect("/campgrounds/" + campground._id);
            });

        }

    });

});

//Auth Routes

app.get("/register", (req, res) => {
    res.render("auth/register");
});

app.post("/register", (req, res) => {
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

app.get("/login", (req, res) => {
    res.render("auth/login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {

});


app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

//server port listening at Port 3000
app.listen("3000", () => console.log("YelpCap Server started on Port #3000"));

//Middleware functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}