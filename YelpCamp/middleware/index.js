//Middleware
var CampGround = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};



//Middleware functions
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/campgrounds");
}


//Check if the user is logged in and authorised to edit/delete
middlewareObj.checkCampGroundOwnership = function (req, res, next) {

    if (req.isAuthenticated()) {
        CampGround.findById(req.params.id, (err, foundCampGround) => {
            if (err) {
                console.log(err);
            } else {
                //Does user own campground
                if (foundCampGround.author.id.equals(req.user._id)) {
                    next();
                } else {
                    //res.send("Cant edit campgrounds. Campground can be editted only by their owners!");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

//Check if the user is logged in and authorised to edit/delete
middlewareObj.checkCommentOwnership = function (req, res, next) {

    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                console.log(err);
            } else {
                //Does user own comment
                console.log(foundComment);
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = middlewareObj;