import express from 'express';
import { addorder, deleteOrder, getAllOrders, updateOrder } from '../controllers/ordercontroller.js';

const orderRouter = express.Router();

orderRouter.post("/add", addorder);      // Add a new order
orderRouter.get("/", getAllOrders);       // Get all orders
orderRouter.put("/:id", updateOrder);    // Update an order
orderRouter.delete("/:id", deleteOrder); // Delete an order

export default orderRouter;

