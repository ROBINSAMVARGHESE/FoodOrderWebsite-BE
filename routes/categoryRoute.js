import express from 'express';
import { addCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categorycontroller.js';


const categoryRouter = express.Router();

categoryRouter.post("/add", addCategory);      
categoryRouter.get("/", getAllCategories);          
categoryRouter.put("/:id", updateCategory);        
categoryRouter.delete("/:id", deleteCategory);   

export default categoryRouter;