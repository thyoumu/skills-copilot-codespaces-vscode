// Create web server
// Comments API
// 1. GET /comments
// 2. POST /comments
// 3. PUT /comments/:id
// 4. DELETE /comments/:id

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  const comments = JSON.parse(fs.readFileSync("./comments.json"));
  res.json(comments);
});

app.post("/comments", (req, res) => {
  const comments = JSON.parse(fs.readFileSync("./comments.json"));
  const newComment = req.body;
  newComment.id = Date.now();
  comments.push(newComment);
  fs.writeFileSync("./comments.json", JSON.stringify(comments));
  res.json(newComment);
});

app.put("/comments/:id", (req, res) => {
  const comments = JSON.parse(fs.readFileSync("./comments.json"));
  const id = parseInt(req.params.id);
  const updatedComment = req.body;
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments[index] = { ...comments[index], ...updatedComment };
    fs.writeFileSync("./comments.json", JSON.stringify(comments));
    res.json(comments[index]);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

app.delete("/comments/:id", (req, res) => {
  const comments = JSON.parse(fs.readFileSync("./comments.json"));
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    fs.writeFileSync("./comments.json", JSON.stringify(comments));
    res.json({ message: "Comment deleted" });
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});