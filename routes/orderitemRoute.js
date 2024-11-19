import express from 'express';
import { addorder, deleteOrder, getAllOrders, updateOrder } from '../controllers/orderitemcontroller.js';


const orderitemRouter = express.Router();

orderitemRouter.post("/add", addorder);      // Add a new order item
orderitemRouter.get("/", getAllOrders);          // Get all order items
orderitemRouter.put("/:id", updateOrder);        // Update an order item
orderitemRouter.delete("/:id", deleteOrder);     // Delete an order item

export default orderitemRouter;
