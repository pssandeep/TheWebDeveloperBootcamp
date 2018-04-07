//Imports
var express = require("express");
var app = express();
var bodyParser = require('body-parser')	;
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//Global Variable
var toDoList = ["asdasd","qweqwe"];

//Middleware Settings
app.set("view engine", "ejs");
app.use(urlencodedParser);
app.use(express.static("public"));

//Routes
app.get("/", function(req,res){
	res.render("home", {toDoList:toDoList});
});

app.post("/add", function(req,res){

	var newToDo = req.body.newToDo;
	toDoList.push(newToDo);
	res.redirect("/");
});

//Server Port
app.listen("3000", () => console.log("SERVER STARTED AT PORT 3000..."));