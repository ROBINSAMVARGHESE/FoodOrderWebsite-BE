import express from 'express';
import multer from 'multer';
import { adduser, deleteUser, getAllUsers, updateUser } from '../controllers/usercontroller.js';


const userRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

userRouter.post("/add", upload.single("image"), adduser);  
userRouter.get("/", getAllUsers);                            
userRouter.put("/:id", updateUser);                          
userRouter.delete("/:id", deleteUser);                   

export default userRouter;


