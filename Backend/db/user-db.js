const mongoose = require("mongoose");

const database = () =>{
    mongoose.connect('mongodb+srv://sundarghodadara:D8vPPZypvo3AXR7Q@cluster0.9dlnm.mongodb.net/tankedup?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("MongoDb Connected "))
    .catch((error) => console.log("Mongo error", error));
}

module.exports = database;

