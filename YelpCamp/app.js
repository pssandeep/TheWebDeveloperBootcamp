var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");

//Schemas Required
var CampGround = require("./models/campground");
var Comment = require("./models/comment");

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


// index route. To display all the campgrounds
app.get("/campgrounds", function (req, res) {

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
app.get("/", function (req, res) {

    res.render("home");
});

// get route to show the form to enter new camp grounds.
app.get("/campgrounds/new", function (req, res) {

    res.render("campgrounds/new");
});

//show route. Show more details about the campgrounds
app.get("/campgrounds/:id", function (req, res) {
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
app.post("/campgrounds", function (req, res) {
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
app.get("/campgrounds/:id/comments/new", function (req, res) {
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
app.post("/campgrounds/:id/comments", function (req, res) {
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

//server port listening at Port 3000
app.listen("3000", () => console.log("YelpCap Server started on Port #3000"));