const express = require("express");
const app = express();
const User = require("./models/user");

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});
app.listen("3000", () => console.log("Server started at port #3000..."));