var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

var baseURL = "http://www.omdbapi.com/?apikey=thewdb";
var ambersand = "&";
var searchParamName = "s=";
var searchParam = "";
var searchResult = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(urlencodedParser);

app.post("/movieSearch", function (req, res) {

    searchParam = req.body.search;
    console.log(req.body);
    console.log(baseURL + ambersand + searchParamName + searchParam);
    if (searchParam.trim() != "") {
        request(baseURL + ambersand + searchParamName + searchParam, function (error, response, searchbody) {
            console.log(response.statusCode);
            console.log(response.statusMessage);
            console.log(JSON.parse(searchbody));
            if (!error && response.statusCode == 200) {
                var results = JSON.parse(searchbody)["Search"];
                results.forEach(element => {
                    searchResult.push(element);
                });
                console.log(searchResult);
            }
            searchParam = "";
            console.log(res.statusCode + " - " + res.statusMessage);
            res.redirect("/");
        });
    }

});

app.get("/", function (req, res) {
    console.log(searchResult);
    res.render("home", {
        searchResult: searchResult
    });
    searchResult = [];

});

app.listen("3000", () => console.log("Server Started at Post 3000."));