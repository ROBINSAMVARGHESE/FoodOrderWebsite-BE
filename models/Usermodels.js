import mongoose from 'mongoose';

// Define the schema for User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name of the user
    },
    email: {
      type: String,
      required: true, // Email address
      unique: true, // Ensure unique email for each user
    },
    password: {
      type: String,
      required: true, // Password of the user
    },
    address: {
      type: String,
      required: true, // Address of the user
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Prevent overwriting the model in case of server restarts or re-imports
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

