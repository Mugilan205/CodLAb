
import bcrypt from "bcrypt";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


const hashOtp = async (otp) => {
  const saltRounds = 10;
  return await bcrypt.hash(otp, saltRounds);
};


const saveOtpToUser = async (user, hashedOtp) => {
  user.otp = hashedOtp;
  user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  user.otpAttempts = 0;
  await user.save();
};


const verifyOtp = async (user, enteredOtp) => {
  // 1. OTP existence check
  if (!user.otp || !user.otpExpiresAt) {
    return { success: false, message: "OTP not found" };
  }

  // 2. Expiry check
  if (user.otpExpiresAt < Date.now()) {
    return { success: false, message: "OTP expired" };
  }

  // 3. Attempt limit
  if (user.otpAttempts >= 3) {
    return { success: false, message: "Too many attempts" };
  }

  // 4. Compare OTP
  const isMatch = await bcrypt.compare(enteredOtp, user.otp);

  if (!isMatch) {
    user.otpAttempts += 1;
    await user.save();
    return { success: false, message: "Invalid OTP" };
  }

  // 5. Clear OTP after success
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  user.otpAttempts = 0;
  await user.save();

  return { success: true, message: "OTP verified successfully" };
};

export { generateOtp, hashOtp, saveOtpToUser, verifyOtp };
