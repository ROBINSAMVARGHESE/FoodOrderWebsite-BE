import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usermodel from "../models/Usermodel.js";  // Assuming Usermodel is your MongoDB user model

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5h' });
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

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
            role, 
        });

        // Create and send token with success message
        const token = createToken(newUser._id);

        // Send token in a cookie for authentication
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token, 
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
            return res.status(401).json({ success: false, message: "Authentication failed" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Authentication failed" });
        }

        const token = createToken(user._id);

        // Send token in a cookie for authentication
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Error during login", error: error.message });
    }
};

// Logout user
const logoutUser = (req, res) => {
    try {
        // Clear the cookie storing the JWT token
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({
            success: false,
            message: 'Error during logout',
            error: error.message,
        });
    }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await Usermodel.find();

        // Respond with the list of users
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message,
        });
    }
};

export { registerUser, loginUser, logoutUser, getAllUsers };
