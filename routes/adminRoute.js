import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin, updateAdmin, checkAdmin } from '../controllers/admincontroller.js';
import { adminAuthentication } from '../middleware/authmiddleware.js';

const adminRouter = express.Router();

adminRouter.post('/register', registerAdmin);   // Correct route for register
adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.put('/update/:id', adminAuthentication, updateAdmin);
adminRouter.get('/check-admin', adminAuthentication, checkAdmin);

export default adminRouter;


