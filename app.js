//Importing Database/ MongoDB Connection
require("./models/db")

const express = require("express");
const app = express();
const path = require("path");
const exphs = require("express-handlebars");
const bodyparser = require("body-parser");
//Importing dotenv
require("dotenv").config()
//Importing user controller
const userController = require("./controllers/userController")

//configuring environment variable
dotenv.config({path: "./config.env"});


//Importing the body-parser middle ware
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

//Setting Up template engine
app.set("views", path.join(__dirname,"/views/"));
app.engine("hbs", exphs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/"}));
app.set("view engine", "hbs");

//controllers middleware
app.use("/", userController)

app.use(express.static("public"))

app.listen(process.env.PORT, ()=>{
    console.log("Server running succesfully on port:"+process.env.PORT)
})