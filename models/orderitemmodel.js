import mongoose from "mongoose";

const OrderitemSchema = new mongoose.Schema({
    orderitemid: { type: Number, required: true },
    orderid: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderitemmodel = mongoose.models.Orderitem || mongoose.model('Orderitem', OrderitemSchema);
export default orderitemmodel;
