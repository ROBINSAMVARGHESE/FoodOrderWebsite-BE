import categorymodel from "../models/categorymodel.js";


// Add a category
const addCategory = async (req, res) => {
    const category = new categorymodel({
        categoryid: req.body.categoryid,
        name: req.body.name,
        description: req.body.description,
    });

    try {
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categorymodel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const category = await categorymodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const category = await categorymodel.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

export { addCategory, getAllCategories, updateCategory, deleteCategory };
