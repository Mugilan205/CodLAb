import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbconfig/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";  
import chatRouter from "./routes/chatRouter.js"
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/api/user", userRoutes);
app.use("/api/chats/", chatRouter);
app.listen(5000, () => console.log("Server running on port 5000"));


