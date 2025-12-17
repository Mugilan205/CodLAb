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
      unique: [true, "Email Already Exist"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password must be provided "],
      minlength: [6, "min Length Not reached "],
      select: true, // during data retrival this value should be taken are not is based on this select arg 
      // if false u have to select during find().select("+password")
    },

    otp: String,
    otpExpires: Date,
    otpAttempts: { type: Number, default: 0 } ,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
