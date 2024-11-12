import usermodel from '../models/usermodel';
import fs from 'fs' 

// Add a user
const addUser = async (req, res) => {
    try {
        const { name, email, phone, street, city, postalCode } = req.body;
        const user = new usermodel({
            name,
            email,
            phone,
            street,
            city,
            postalCode,
            profilePic: req.file ? req.file.filename : undefined,  // If a profile picture is uploaded
        });
        await user.save();
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await usermodel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await usermodel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

export default { addUser, getAllUsers, updateUser, deleteUser };
