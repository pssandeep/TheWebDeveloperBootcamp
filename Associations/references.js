var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

var User = mongoose.model("User", userSchema);



// var newPost = new Post({
//     title:"akldjfhaskdsdfgsdfgsfgsdfgfffffffffff",
//     content: "asdjkfhksdfsdfgsfdgffffffffff"
// });

// newPost.save();


// var newUser = new User({
//     email:"akldjfhaskd",
//     name: "asdjkfhk"
// });

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });


// var newPost = new Post({
//     title: "akldjfhaskdsdfgsdfgsfgsdfgfffffffffff",
//     content: "asdjkfhksdfsdfgsfdgffffffffff"
// });

// newPost.save(function (err, newPost) {
//     User.findOne({
//         name: "asdjkfhk"
//     }, function (err, user) {
//         user.posts.push(newPost);
//         user.save();
//     });
// });

User.findOne({name:"asdjkfhk"}).populate("posts").exec(function(err,user){
    console.log(user);
});