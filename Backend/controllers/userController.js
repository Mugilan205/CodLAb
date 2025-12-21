import User from "../models/userschema.js";
import { storeCookie } from "../models/userServices.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../models/userServices.js";
import { transporter, mailOptions } from "../middlewares/sendMail.js";
import { generateOtp, hashOtp, saveOtpToUser, verifyOtp  } from "./otpController.js";
// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });
    console.log(`User created : ${email}`)
    res.json({ message: "User created", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
  if(!user) return res.status(404).json({ message: "User not found" });
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user._id);
    storeCookie(token, res);
    
    res.json({ message: "Login successful", token , user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// verification code
export const sendVerificationCode = async (req, res)=>{
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not Exist " });
    }
    if (user.verified) {
            return res.status(200).json({ success: true, message: "Already verified" });
    }
    const otp = generateOtp(); 
    console.log(`hello ${user.name}`);
    const hashedotp = await hashOtp(otp);
    try {
      const name = user.name;
      const info = await transporter.sendMail(mailOptions({ email, name , otp })); 
      // console.log(process.env.NODE_EMAIL);
      await saveOtpToUser(user, hashedotp).catch((err) => {
        console.log(err.message);
      });
      if((await info).accepted[0] === email)
        res.status(200).json({ message: "email sent" });
      else res.status(400).json({ message: info.message });
    }
    catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "failed..." });
    }
  }
  catch(err){
    console.log(err);
  }
}
