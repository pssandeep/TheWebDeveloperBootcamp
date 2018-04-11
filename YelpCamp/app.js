var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/",function(req,res){

    res.render("home");
});

var campgrounds= [
    {name:"Camp Ground 1", image : "http://parkweb.vic.gov.au/__data/assets/image/0005/665519/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 2", image : "http://parkweb.vic.gov.au/__data/assets/image/0011/665399/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 3", image : "http://parkweb.vic.gov.au/__data/assets/image/0011/695450/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 4", image : "http://parkweb.vic.gov.au/__data/assets/image/0007/665413/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 5", image : "http://parkweb.vic.gov.au/__data/assets/image/0008/665432/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 6", image : "http://parkweb.vic.gov.au/__data/assets/image/0008/688049/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 4", image : "http://parkweb.vic.gov.au/__data/assets/image/0007/665413/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 5", image : "http://parkweb.vic.gov.au/__data/assets/image/0008/665432/varieties/heroImageLarge.jpg"},
    {name:"Camp Ground 6", image : "http://parkweb.vic.gov.au/__data/assets/image/0008/688049/varieties/heroImageLarge.jpg"}
];

app.get("/campgrounds",function(req,res){

    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req,res){

    res.render("new");
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name : name, image : image};

    campgrounds.push(newCampGround);

    res.redirect("/campgrounds");
});
app.listen("3000", () => console.log("YelpCap Server started on Port #3000"));
