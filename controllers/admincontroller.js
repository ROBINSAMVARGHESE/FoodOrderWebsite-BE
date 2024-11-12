import adminModel from '../models/adminmodel.js';
import createToken from '../utils/auth.js';

export const registerAdmin = async (req, res) => {
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
        const token = createToken(newAdmin._id);  // Ensure this uses your token creation function

        // Send success response with the token
        res.status(201).json({ success: true, token, message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error in registering admin:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Admin login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = createToken(admin._id);

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error in logging in admin:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin logout
export const logoutAdmin = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
        console.error('Error in logging out admin:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update admin details
export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedAdmin = await adminModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true, admin: updatedAdmin });
    } catch (error) {
        console.error('Error in updating admin:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Check admin status
export const checkAdmin = async (req, res) => {
    try {
        const adminId = req.adminId;  // Retrieved from middleware
        const admin = await adminModel.findById(adminId);

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true, admin });
    } catch (error) {
        console.error('Error in checking admin status:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Controller function to get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        console.error('Error in fetching admins:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

