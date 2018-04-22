const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo");
const userSchema = new mongoose.Schema({
    name : {type : String}
});

module.exports = mongoose.model("User", userSchema);