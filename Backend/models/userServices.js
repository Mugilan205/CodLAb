import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* 🔹 Hash password before saving */
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

/* 🔹 Compare plain password with hashed */
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

/* 🔹 Generate JWT Token */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",  
  });
};

export const storeCookie = (token, res) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
    success: true,
    token, 
    message:"logged Successfully..ck"
  });
  
}

