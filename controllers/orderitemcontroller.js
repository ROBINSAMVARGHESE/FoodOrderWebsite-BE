import orderitemmodel from "../models/orderitemmodel.js";

// Add an order
const addorder = async (req, res) => {
    const order = new orderitemmodel({
        orderitemid: req.body.orderitemid,
        orderid: req.body.orderid,
        quantity: req.body.quantity,
        price: req.body.price,
    });

    try {
        await order.save();
        res.status(201).json({ message: 'Order added successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error adding order', error: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderitemmodel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const order = await orderitemmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await orderitemmodel.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};

export { addorder, getAllOrders, updateOrder, deleteOrder };
