import User from "../model/user.model.js";
import generateToken from "../utils/generateToken.js";

// Signup
export const registerUser = async (req, res) => {
  
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User registered successfully",
      token
    });

  } 
// Login
export const loginUser = async (req, res) => {
  
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && await user.matchPassword(password)) {
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "User logged in success",
        token
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }


  } ;