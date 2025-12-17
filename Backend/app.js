import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbconfig/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
// connect to database
connectDB();
app.use(express.json());
// Use Routes
app.use("/api/user", userRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));


