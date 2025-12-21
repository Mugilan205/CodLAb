import express from "express";
import { register, login } from "../controllers/userController.js";
import { sendVerificationCode } from "../controllers/userController.js";
const router = express.Router();

// Route for Register
router.post("/register", register);

// Route for Login
router.post("/login", login);

//route for sendOtp

router.post("/verify", sendVerificationCode);




export default router;
