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
    timestamps: true,  
    minimize: false,  
});

const Usermodel = mongoose.models.Users || mongoose.model('Users', userSchema);
export default Usermodel;
