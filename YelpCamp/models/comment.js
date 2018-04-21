var mongoose = require("mongoose");

//Schema Definition
var commentSchema = new mongoose.Schema({
    text: String,
    author:String
});

//Schema Model
module.exports = mongoose.model("Comment", commentSchema);