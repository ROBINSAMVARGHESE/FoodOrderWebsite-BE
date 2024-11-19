import PaymentModel from "../models/paymentmodel.js";

// Add a payment
export const addPayment = async (req, res) => {
    const payment = new PaymentModel({
        paymentid: req.body.paymentid,
        orderid: req.body.orderid,
        paymentstatus: req.body.paymentstatus,
        paymentmethod: req.body.paymentmethod,
    });

    try {
        await payment.save();
        res.status(201).json({ message: "Payment added successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Error adding payment", error: error.message });
    }
};

// Get all payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payments", error: error.message });
    }
};

// Update a payment
export const updatePayment = async (req, res) => {
    try {
        const payment = await PaymentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.status(200).json({ message: "Payment updated successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Error updating payment", error: error.message });
    }
};

// Delete a payment
export const deletePayment = async (req, res) => {
    try {
        const payment = await PaymentModel.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error: error.message });
    }
};
