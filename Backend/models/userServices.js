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
