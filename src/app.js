import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.send("Test from the server.");
});

app.get("/hello", (req, res) => {
  res.send("Hello from the server.");
});

app.listen(7777, () => {
  console.log("Server running at port 7777.");
});
