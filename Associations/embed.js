var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
    email: "test2@test.com",
    name: "test2",
    posts: [{
            title: "erqwerqerqerqwrqwerqwer",
            content: "asfadfafasdfadsfasdf"
        },
        {
            title: "erqwerqerqerqwrqwerqwer",
            content: "asfadfafasdfadsfasdf"
        },
        {
            title: "erqwerqerqerqwrqwerqwer",
            content: "asfadfafasdfadsfasdf"
        },
        {
            title: "erqwerqerqerqwrqwerqwer",
            content: "asfadfafasdfadsfasdf"
        },
        {
            title: "erqwerqerqerqwrqwerqwer",
            content: "asfadfafasdfadsfasdf"
        },
        {
            title: "erqwerqerqerqwrqwerqwer",
            content: "asfadfafasdfadsfasdf"
        }
    ]
});

newUser.save(function (err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});

// var newPost = new Post({
//     title:"test test test test",
//     content:"TEST TESTT TESTTTT ESTTTTTT"
// });

// newPost.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });