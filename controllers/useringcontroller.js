import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usermodel from "../models/Usermodel.js";  // Corrected to default import

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        // Check if user already exists
        const existUser = await Usermodel.findOne({ email });
        if (existUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered, please log in",
            });
        }

        // Hash password and create user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Usermodel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Create and send token with success message
        const token = createToken(newUser._id);

        // Send token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Error in creating user or token:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating user or token",
            error: error.message,
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);

        // Send token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { registerUser, loginUser };


