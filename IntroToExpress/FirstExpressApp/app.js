var express = require("express");
var app = express();

console.log("Express.js App.js");

app.get("/",function(req,res){

	res.send("<H1>Hi There</H1>");
});


app.get("/bye",function(req,res){

	res.send("<H1>Good Bye</H1>");
});


app.get("/params/:parameters",function(req,res){

	res.send("<H1>" + req.params.parameters + "</H1>");
});

app.get("*",function(req,res){

	res.send("<H1>Wrong Page</H1>");
});


app.listen("3000", function(){
	console.log("Server started at port 3000...");

});