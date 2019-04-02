//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
let port = process.env.PORT;


const homeStartingContent = "Hi my name is Vikram ray and this is my tech-journal. As you can see this is a simple and basic blog that i have made as a assignment during my Web-Dev course in Udemy. I have used HTML CSS with NodeJS MongoDB to complete this project. I have used various NPM packages like EJS for templating, ExpressJS for server , Mongoose for simplifying MongoDB , body-parser, etc.";
const aboutContent = "Hi my name is Vikram ray and this is my tech-journal. As you can see this is a simple and basic blog that i have made as a assignment during my Web-Dev course in Udemy. I have used HTML CSS with NodeJS MongoDB to complete this project.";
const contactContent = "You can contact me or whatsapp me on 7974550078 & 9039360617.";
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect(process.env.mDB, {
  useNewUrlParser: true
});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({
    _id: requestedPostId
  }, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/admin", function(req, res) {
  res.render("admin");
});

app.post("/admin", function(req, res) {
  if (req.body.id == process.env.adminID && req.body.password == process.env.adminPass) {
    res.render("compose");
  } else {
    res.send("  <h1>INCORRECT ID OR PASSWORD</h1> ");
  }
});

app.post("/delete",function(req,res){
  if(req.body.password == process.env.adminPass){
    Post.deleteMany({},function(err){
      if(err){
        res.send("CANNOT DELETE POST");
      }else{
        res.redirect("/");
      }
    });
  }else{
    res.send("<h1>INCORRECT USERNAME</h1>")
  }
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});
