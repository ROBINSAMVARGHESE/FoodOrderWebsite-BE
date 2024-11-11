import mongoose from "mongoose";  // Import mongoose

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,     
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    cartData: {
        type: Object,
        default: {},
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    minimize: false,  // Ensures empty objects are saved as empty objects, not as null
});

const Usermodel = mongoose.models.Users || mongoose.model('Users', userSchema);
export default Usermodel;
