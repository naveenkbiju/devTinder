import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import { createServer } from "http";
import initializeSocket from "./utils/socket.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);

const server = createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connected.");
    server.listen(7777, () => {
      console.log("Server running at port 7777.");
    });
  })
  .catch((err) => {
    console.error("Database not connected");
  });
