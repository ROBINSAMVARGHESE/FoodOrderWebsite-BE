import express from "express";
import userController from "../controllers/usercontroller.js";

const { addUser, deleteUser, getAllUsers, getUserById, updateUser } = userController;

const Userrouter = express.Router();

Userrouter.post("/", addUser);
Userrouter.get("/", getAllUsers);
Userrouter.get("/:id", getUserById);
Userrouter.put("/:id", updateUser);
Userrouter.delete("/:id", deleteUser);

export default  Userrouter;


