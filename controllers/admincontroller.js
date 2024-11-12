  // Import Admin Model
import adminModel from '../models/adminmodel.js';
import  createToken from '../utils/auth.js';

// Register new admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ success: false, message: 'Admin already registered' });
        }

        // Create and save the new admin
        const newAdmin = new adminModel({
            name,
            email,
            password,
            phone
        });

        await newAdmin.save();

        // Create a JWT token
        const token = createToken(newAdmin._id);

        res.status(201).json({ success: true, token, message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error in registering admin:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = createToken(admin._id);

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error in logging in admin:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { registerAdmin, loginAdmin };
