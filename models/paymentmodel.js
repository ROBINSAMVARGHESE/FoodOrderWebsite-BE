import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentid: { type: String, required: true },
    orderid: { type: String, required: true },
    paymentstatus: { type: String, required: true },
    paymentmethod: { 
        type: String, 
        required: true,
        enum: ["Credit Card", "Debit Card", "Net Banking", "UPI", "PayPal", "Cash on Delivery", "Google Pay"] 
    },
}, { timestamps: true });

const Paymentmodel = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Paymentmodel;

