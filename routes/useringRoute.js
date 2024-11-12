import express from 'express';
import { registerUser, loginUser, logoutUser, getAllUsers } from '../controllers/useringcontroller.js';
import { adminAuthentication } from '../middleware/authmiddleware.js';

const useringRoute = express.Router();

// Register route
useringRoute.post('/register', registerUser);

// Login route
useringRoute.post('/login', loginUser);

// Logout route
useringRoute.post('/logout', logoutUser);

// Route to get all users (only accessible by admins)
useringRoute.get('/all', adminAuthentication, getAllUsers);

export default useringRoute;
