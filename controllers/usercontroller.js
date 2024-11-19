import mongoose from "mongoose";
import Usermodels from "../models/Usermodels.js";


// Create a new user
const addUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // Basic validation
        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingUser = await Usermodels.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Create and save the new user
        const user = new Usermodels({ name, email, password, address });
        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await Usermodels.find({}, "-password"); // Exclude password from response
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error.message);
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await Usermodels.findById(id, "-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user:", error.message);
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await Usermodels.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await Usermodels.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export default { addUser, getAllUsers, getUserById, updateUser, deleteUser };


