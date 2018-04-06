var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/login/:username", function(req,res){
	var user = req.params.username;

	var list = [
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"},
		{ name:"sandeep", title:"Developer"}
	];
	res.render("username", {username : user, list:list});

});


app.get("/", function(req,res){

	res.render("home");
	//res.send("WORKING...");

});

app.listen("3000", function(){

	console.log("SERVER STARTED AT PORT 3000...");
});