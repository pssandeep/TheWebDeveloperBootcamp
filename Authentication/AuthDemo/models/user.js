const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/auth_demo");
const userSchema = new mongoose.Schema({
    name : {type : String},
    passport : {type : String}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);