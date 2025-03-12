import express from "express";
import User from "../models/user.js";
import validateSignupData from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, password, emailId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      emailId,
    });
    await user.save();
    return res.send("User added succesfully.");
  } catch (err) {
    res.send("error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }
    const token = jwt.sign({ id: user._id }, "password");
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send("Login successful.");
  } catch (err) {
    res.status(400).send("error saving the user: " + err.message);
  }
});

export default authRouter;
