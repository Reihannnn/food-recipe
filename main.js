const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const post = []; // simpan item
let ID = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/post", (req, res) => {
  const chefName = req.body["chef-name"];
  const foodName = req.body["food-name"];
  const message = req.body["message"];
  const foodImage = req.body["food-image"];

  const result = {
    id: ID,
    chefName: chefName,
    foodImage: foodImage,
    foodName: foodName,
    message: message,
  };

  ID++; // incremetnt id

  post.push(result);
  console.log(post);

  res.render("post.ejs", { hasil: post });
});

app.get("/new-post", (req, res) => {
  res.render("form.ejs");
});

app.get("/post", (req, res) => {
  const deleteId = req.query.deleteId;

  if (deleteId) {
    const postId = parseInt(deleteId);
    const index = post.findIndex((p) => p.id === postId);

    if (index !== -1) {
      post.splice(index, 1);
      console.log(`Post with ID ${postId} deleted successfully.`);
    } else {
      console.log(`Post with ID ${postId} not found.`);
    }
  }
  res.render("post.ejs", { hasil: post });
});

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`localhost run in port : ${port}`);
});
