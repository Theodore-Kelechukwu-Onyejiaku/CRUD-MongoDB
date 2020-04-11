const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");


//  GET REQUESTS



//Index page
router.get("/", (req, res)=>{
    User.find((err, doc)=>{
        if(err){
            console.log("Error reading database")
        }else{
            res.render("index", {list: doc, message: "Welcome"})
        }
    })
   
})


//Edit page
router.get("/edit/:_id", (req, res)=>{
    User.findById(req.params._id, (err, doc)=>{
        if(err){
            res.redirect("/")
        }else{
            res.render("edit", {message: "Edit, Ma/Sir", doc: doc})
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
    })
})

//Delete question
router.get("/item/:_id", (req, res)=>{
    User.findById(req.params._id, (err, doc)=>{
        res.render("delete", {item : doc})
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

//Delete permanently
router.post("/delete", (req, res)=>{
    //console.log(req.body)
    var code = req.body.code;
    User.findById(req.body._id, (err, doc)=>{
        if(!err){
            if(code == doc.access_code){
                User.findOneAndRemove(req.body._id, (err, doc)=>{
                    if(err){
                        console.log(err);
                        res.render("index", {message: err})
                    }else{
                        res.redirect("/")
                    }
                })
            }else{
                res.render('delete', {message: "Access code is wrong, Lol, Hahahaha, have you forgotten?", item:doc})
            }
        }else{
            res.render('delete', {message: "Wrong Access Code, Lol", item:doc})
        }
    })
   
})

//Edit Post
router.post("/edit", (req, res)=>{
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(err){
            res.render("edit", {message: "can't update"})
        }else{
            res.redirect("/")
        }
    })
})


module.exports = router;