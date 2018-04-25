var express = require("express");
var router = express.Router();
var CampGround = require("../models/campground");

// Campgrounds Route

// index route. To display all the campgrounds
router.get("/", isLoggedIn, function (req, res) {
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

// get route to show the form to enter new camp grounds.
router.get("/new", isLoggedIn, function (req, res) {

    res.render("campgrounds/new");
});

//show route. Show more details about the campgrounds
router.get("/:id", isLoggedIn, function (req, res) {
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
router.post("/", isLoggedIn, function (req, res) {
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

//Middleware functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}

//Export the router
module.exports = router;