var express = require("express");
//mergeParam to access the :id param from app.js here
var router = express.Router({
    mergeParams: true
});
var CampGround = require("../models/campground");
var Comment = require("../models/comment");

//Comment Routes

//Comments - Add New Comments
router.get("/new", isLoggedIn, function (req, res) {
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
router.post("/", isLoggedIn, function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save comments
                comment.save();
                //add Comments to Campgrounds
                campground.comments.push(comment),
                //Save Campgrounds
                campground.save();
                res.redirect("/campgrounds/" + campground._id);
            });

        }

    });

});

//Middleware functions
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/campgrounds");
}

//Export the router
module.exports = router;