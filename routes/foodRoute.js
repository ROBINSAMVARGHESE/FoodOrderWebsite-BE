import express from 'express';
import { addFood, deleteFood, getAllFoods, updateFood } from '../controllers/foodcontroller.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage }); 


foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/", getAllFoods);                              
foodRouter.put("/:id", updateFood);                           
foodRouter.delete("/:id", deleteFood);  

export default foodRouter;
