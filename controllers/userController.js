const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");


//  GET REQUESTS
router.get("/", (req, res)=>{
    User.find((err, doc)=>{
        if(err){
            console.log("Error reading database")
        }else{
            res.render("index", {list: doc, message: "Welcome"})
        }
    })
   
})

//add oneself
router.get("/add", (req, res)=>{
    res.render("add", {
        message: "Welcome!"
    })
})

//read a message
router.get("/:_id", (req, res)=>{
    User.findById(req.params._id, (err, doc)=>{
        res.render("message", {message : doc})
        console.log(doc)
    })
})

//Delete
router.get("/delete/:_id", (req, res)=>{
    User.findByIdAndDelete(req.params._id, (err, doc)=>{
        if(err){
            console.log(err);
            res.render("index", {message: err})
        }else{
            res.redirect("/")
        }
        console.log(doc)
    })
})


// POST REQUESTS
router.post("/add", (req, res)=>{
    const user = new User();
    user.name = req.body.name;
    user.access_code = req.body.access_code;
    user.stack = req.body.stack;
    user.message = req.body.message;
    user.date = new Date();
    user.save((err, doc)=>{
        if(err){
            console.log("error in inserting document");
            alert("Error inserting writing to database")
        }else{
            console.log("Success in inserting to database")
            res.redirect("/")
        }
    })
})

module.exports = router;