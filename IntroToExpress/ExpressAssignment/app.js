var express = require("express");
var app = express();


app.get("/", function(req,res){
	res.send("<h1>Hi there, welcome to my assignment page</h1>");
});

app.get("/speak/:animal", function(req,res){

	var a = req.params.animal;
	if(a=="pig"){
		res.send("<h1>Oink</h1>");
	} else if(a=="cow"){
		res.send("<h1>Moo</h1>");
	}else if(a=="dog"){
		res.send("<h1>Woof</h1>");
	} else {
		res.send("<h1>Wrong Animal :(</h1>");
	}

});

app.get("/repeat/:param1/:param2", function(req,res){

	var str = "";
	for(var i = Number(req.params.param2); i> 0 ;i--){
	str+=req.params.param1+" ";
}
res.send(str);
});

app.get("*", function(req,res){
res.send("Wrong Page");
});

app.listen("3000", function(){

	console.log("Starting App on Port 3000...");
});