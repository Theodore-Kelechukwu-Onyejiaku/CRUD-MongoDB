const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res)=>{
    res.render("index")
})


router.post("/addUser", (req, res)=>{
    const user = new User();
    user.name = req.body.name;
    user.dele = req.body.username;
    user.save((err, doc)=>{
        if(err){
            console.log("error in inserting document");
            alert("Error inserting to database")
        }else{
            console.log("Success in inserting to database")
            res.end("<h1>Success in inserting to database</h1>")
        }
    })
})

module.exports = router;