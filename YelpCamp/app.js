var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser);
app.set("view engine", "ejs");
app.use(express.static("public"));

//Connect to MongoDB
mongoose.connect('mongodb://localhost/YelpCamp');

//Schema Definition
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String
});

//Schema Model
var CampGround = mongoose.model("CampGround", campgroundSchema);

// index route. To display all the campgrounds
app.get("/campgrounds", function (req, res) {

    CampGround.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: campgrounds
            });
        }
    });

});

// All Routes.

//home route
app.get("/", function (req, res) {

    res.render("home");
});

// get route to show the form to enter new camp grounds.
app.get("/campgrounds/new", function (req, res) {

    res.render("new");
});

//show route. Show more details about the campgrounds
app.get("/campgrounds/:id", function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
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
        description : desc
    };

    CampGround.create(newCampGround, function (err, newlyAddedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });


});

//server port listening at Port 3000
app.listen("3000", () => console.log("YelpCap Server started on Port #3000"));