var express = require("express");
var router = express.Router();
var CampGround = require("../models/campground");

// Campgrounds Route

// index route. To display all the campgrounds
router.get("/", function (req, res) {
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
router.get("/:id",  function (req, res) {
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
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampGround = {
        name: name,
        image: image,
        description: desc,
        author : author
    };

    CampGround.create(newCampGround, function (err, newlyAddedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });


});

//Form to Edit Campgrounds
router.get("/:id/edit", (req,res) => {
    CampGround.findById(req.params.id, (err, foundCampGround) => {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/edit", {campground : foundCampGround});
        }
        
    });
    
});

//Edit Campgrounds
router.put("/:id", (req,res) => {
    CampGround.findByIdAndUpdate(req.params.id,req.body.campground, (err, updatedCampGround) => {
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
        
    });
    
});

//Delete Campgrounds
router.delete("/:id", (req,res) => {
    CampGround.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/");
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