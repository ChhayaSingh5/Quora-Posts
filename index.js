const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'    //random id
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "I love coding",    
    },
    {
        id : uuidv4(),
        username : "chhayasingh",
        content : "I got selected for my 1st intership!", 
    },
    {
        id : uuidv4(),
        username : "viveksingh",
        content : "Hardwork is the key to achieve success",
    }
]

// view all posts 
app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

// form
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

// form filled and redirect to the view post
app.post("/posts", (req, res) => {
    let { username , content } = req.body;
    let id = uuidv4();
    posts.push({ id, username , content });
    res.redirect("/posts");
});

// post with id
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
      res.send("Post not found");
    } else {
      res.render("show.ejs", { post });
    }
  });

//   for update post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

//  for edit the post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

//  for delete
app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
  
app.listen(port, () => {
    console.log("listening to port : 8080");
});

