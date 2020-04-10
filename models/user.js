const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type: String},
    access_code: {type: Number},
    stack: {type: String},
    message: {type: String}
})

mongoose.model("User", userSchema)