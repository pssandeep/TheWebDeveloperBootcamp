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

app.get("/", function (req, res) {

    res.render("home");
});

mongoose.connect('mongodb://localhost/YelpCamp');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String
});

var CampGround = mongoose.model("CampGround", campgroundSchema);

// CampGround.create({
//     name: "Camp Ground 1",
//     image: "http://parkweb.vic.gov.au/__data/assets/image/0005/665519/varieties/heroImageLarge.jpg"
// }, function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
// });

// var campgrounds = [{
//         name: "Camp Ground 1",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0005/665519/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 2",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0011/665399/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 3",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0011/695450/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 4",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0007/665413/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 5",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0008/665432/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 6",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0008/688049/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 4",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0007/665413/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 5",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0008/665432/varieties/heroImageLarge.jpg"
//     },
//     {
//         name: "Camp Ground 6",
//         image: "http://parkweb.vic.gov.au/__data/assets/image/0008/688049/varieties/heroImageLarge.jpg"
//     }
// ];


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

    // res.render("campgrounds", {
    //     campgrounds: campgrounds
    // });
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

//server port listening
app.listen("3000", () => console.log("YelpCap Server started on Port #3000"));