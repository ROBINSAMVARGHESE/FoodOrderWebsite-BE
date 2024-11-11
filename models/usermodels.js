import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: Number, required: true },
    address: { type: String, required: true }

});

const usermodel = mongoose.Model.user || mongoose.model('User', UserSchema);

export default usermodel;