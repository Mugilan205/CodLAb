import User from "../models/userschema.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../models/userServices.js";

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

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user._id);

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

