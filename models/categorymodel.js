import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryid: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const categorymodel = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default categorymodel;

