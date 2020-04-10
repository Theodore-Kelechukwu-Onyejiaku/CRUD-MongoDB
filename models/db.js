const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

//configuring dotenv
dotenv.config({path: "./config.env"})

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(connection=>{
    console.log("MongoDB connection successful")
}).catch(err =>{
    console.error("Error connecting to database: "+err)
})

//Requring user model
require("./user")