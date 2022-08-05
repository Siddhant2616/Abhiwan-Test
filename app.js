const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const saltRounds = 14;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/user2DB");

const userSchema = mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User",userSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/Signup",function(req,res){
    res.render("Signup");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/logout",function(req,res){
    res.redirect("/");
});

app.post("/Signup", function(req,res){

    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
        const newUser = new User({
            email: req.body.email,
            password: hash
        });
        newUser.save(function(err){
            if(!err){
                console.log("User is registered");
            }
        res.render("access")
        })
    });
});

app.post("/login", function(req,res){
    const username = req.body.email;
    const password = req.body.password;
     
    User.findOne({email: username}, function(err, foundUser){
       if(err){
           console.log(err);
       }else{
         if(foundUser){
           bcrypt.compare(password, foundUser.password, function(err, result){
            if(result === true){
                res.render("access");
            }
           });
       }
    }});
       
    });


























app.listen(3000, function(){
    console.log("Server started on port 3000");
})

