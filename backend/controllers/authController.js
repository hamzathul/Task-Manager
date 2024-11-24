import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      //GENERATE JWT token here
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      // Remove password before sending user data
      const userResponse = newUser.toObject();
      delete userResponse.password;

      res
        .status(201)
        .json({ user: userResponse, message: "User registered successfully" });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    // Remove password before sending user data
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user:userResponse, message: "Login successful" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const profile = async (req, res) => {
  res.json(req.user);
};

export { register, login, profile };
