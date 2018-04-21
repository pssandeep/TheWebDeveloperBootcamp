var mongoose = require("mongoose");

//Schema Definition
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

//Schema Model
module.exports = mongoose.model("CampGround", campgroundSchema);