const mongoose = require("mongoose");
const path = require("path");

//configuring dotenv
require('dotenv').config()

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