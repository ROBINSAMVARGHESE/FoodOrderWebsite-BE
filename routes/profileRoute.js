import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js'; // Ensure this path is correct

const profileRouter = express.Router(); // Define profileRouter

// Use profileRouter, not router
profileRouter.get('/profile', authmiddleware, (req, res) => {
    res.status(200).json({ success: true, data: req.user });
});

export default profileRouter;
