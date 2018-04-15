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
mongoose.connect('mongodb://localhost/blogapp');

//Schema Definition
var blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    body:String,
    created:{type: Date, default: Date.now }
});




// All RESTful Routes

app.listen("3000", () => console.log("BlogApp started on Port #3000"));