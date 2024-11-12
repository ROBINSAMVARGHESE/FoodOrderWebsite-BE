import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Importing bcryptjs

// Admin Schema definition
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save hook for hashing the password before saving to database
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // If password hasn't changed, skip hashing
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with salt rounds
  next(); // Move to the next middleware
});

// Method to compare input password with the stored hashed password
adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare password with hash
};

// Create the model
const adminModel = mongoose.model('Admin', adminSchema);

export default adminModel;


