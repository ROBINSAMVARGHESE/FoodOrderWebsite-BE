import foodmodel from '../models/foodmodel.js';
import fs from 'fs' 

// Add a food item
const addFood = async (req, res) => {

    // let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name: req.body.name,
        restaurant: req.body.restaurant,
        price: req.body.price,
        category: req.body.category,
        // image:image_filename
    })
  try {
    await food.save();
    res.status(201).json({ message: 'Food item added successfully', food });
  } catch (error) {
    res.status(500).json({ message: 'Error adding food item', error });
  }
};

// Get all food items
export const getAllFoods = async (req, res) => {
    try {
        const foods = await foodmodel.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving food items', error: error.message });
    }
};

// Update a food item
export const updateFood = async (req, res) => {
    try {
        const food = await foodmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json({ message: 'Food item updated successfully', food });
    } catch (error) {
        res.status(500).json({ message: 'Error updating food item', error: error.message });
    }
};

// Delete a food item
export const deleteFood = async (req, res) => {
    try {
        const food = await foodmodel.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting food item', error: error.message });
    }
};

export { addFood }


