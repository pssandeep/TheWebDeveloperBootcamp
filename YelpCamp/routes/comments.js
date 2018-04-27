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

//Form to edit comment
router.get("/:comment_id/edit",checkCommentOwnership,  function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                } else{
                    res.render("comments/edit", {
                        campground: campground,
                        comment : foundComment
                    });  
                }
            });
        }

    });

});

//Form to edit comment
router.put("/:comment_id", checkCommentOwnership,  function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/" + req.params.id);  
        }
    });
});


//Form to edit comment
router.delete("/:comment_id", checkCommentOwnership,  function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/" + req.params.id);  
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

//Check if the user is logged in and authorised to edit/delete
function checkCommentOwnership(req, res, next) {

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

//Export the router
module.exports = router;