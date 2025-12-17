import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// 1. Create a transporter (SMTP connection)
const transporter = nodemailer.createTransport({
  //   host: "smtp.google.com", // e.g., smtp.gmail.com
  //   port: 587, // 465 for secure
  //   secure: false, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_EMAIL_PWD,
  },
});

// 2. Define email options
const mailOptions = ({ email,name,otp}) => {
    return {
      from: `"MyApp Security" <${"monkey.d.mugilan@gmail.com"}>`,
      to: email ||  "mugilan.v2023ece@sece.ac.in",  
      subject: "Your OTP Code – Valid for 5 Minutes",
      text: `
Hello ${name},

Your One-Time Password (OTP) is: ${otp}

This OTP is valid for 5 minutes.
Do not share this code with anyone.

If you did not request this, please ignore this email.

– MyApp Security Team
  `,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
      <h2 style="color:#333;">🔐 OTP Verification</h2>
      <p>Hello <strong>${name}</strong>,</p>

      <p>Your One-Time Password (OTP) is:</p>

      <div style="
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        background: #f4f4f4;
        padding: 12px;
        text-align: center;
        border-radius: 6px;
        margin: 20px 0;
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <strong>5 minutes</strong>.</p>

      <p style="color: #d9534f;">
        ⚠️ Do not share this OTP with anyone.
      </p>

      <p>If you didn’t request this, you can safely ignore this email.</p>

      <hr />
      <p style="font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </div>
  `,
    };
};

export{ transporter, mailOptions };
