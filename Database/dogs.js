var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');


var dogSchema = mongoose.Schema({
    name: String,
    breed: String
});

var Dog = mongoose.model('dog', dogSchema);
var newDog = new Dog({
    name: "Fluffy",
    breed: "bobcat"
});

newDog.save(function (error, dbDog) {
    if (error) {
        console.log("ERROR");
        console.log(error);
    } else {
        console.log("Data saved to MongoDB");
        console.log(dbDog);
    }

    listDogs();
});

listDogs = function () {
    Dog.find(function (error, dbDogs) {
        if (error) {
            console.log("ERROR");
            console.log(error);
        } else {
            console.log("List of Dogs from DB...");
            console.log(dbDogs);
        }
    });
}