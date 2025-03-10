import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";

const app = express();

app.post("/signup", async (req, res) => {
  try {
    const userObj = {
      firstName: "Naveen",
      lastName: "KB",
      age: 23,
      emailId: "naveen@email.com",
      password: "naveen@123",
    };
    const user = new User(userObj);
    await user.save();
    return res.send("User added succesfully.");
  } catch {
    res.status(400).send("error saving the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected.");
    app.listen(7777, () => {
      console.log("Server running at port 7777.");
    });
  })
  .catch((err) => {
    console.error("Database not connected");
  });
