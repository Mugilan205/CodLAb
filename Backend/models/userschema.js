import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email must be provided "],
      unique: [true, " must be Unique "],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password must be provided "],
      minlength: [6, "min Length Not reached "],
      select: false,
    },

    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
