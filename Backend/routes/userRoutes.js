import express from "express";
import { register, login } from "../controllers/userController.js";
const router = express.Router();

// Route for Register
router.post("/register", register);

// Route for Login
router.post("/login", login);

export default router;
