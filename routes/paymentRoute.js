import express from "express";
import { addPayment, deletePayment, getAllPayments, updatePayment } from "../controllers/paymentcontroller.js";

const paymentRouter = express.Router();

paymentRouter.post("/add", addPayment);
paymentRouter.get("/", getAllPayments);
paymentRouter.put("/:id", updatePayment);
paymentRouter.delete("/:id", deletePayment);

export default paymentRouter;


