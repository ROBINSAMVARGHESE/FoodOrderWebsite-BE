import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    order: { type: String},
    userid: { type: String, required: true },
    orderdate: { type: Number, required: true, unique: true },
    state: { type: Number, required: true },
    totalamount: { type: Number, required: true }
});

const ordermodel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default ordermodel;
