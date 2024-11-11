import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { registerUser, findUserByEmail } from "../controllers/useringcontroller"; // Add findUserByEmail function to retrieve users by email
import authMiddleware from "../middleware/authmiddleware";


const useringRoute = express.Router();

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register route
useringRoute.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await registerUser({ name, password: hashedPassword });
        const token = createToken(newUser._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Error registering user", error: error.message });
    }
});

// Login route
useringRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Error logging in", error: error.message });
    }
});

// Profile route to get user details
useringRoute.get('/profile', authMiddleware, async (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.error("Error retrieving profile:", error);
        res.status(500).json({ success: false, message: "Error retrieving profile", error: error.message });
    }
});

export default useringRoute;

