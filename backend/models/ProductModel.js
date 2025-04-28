import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean, required: false }, // Fixed syntax error (type -> type: Boolean) and made optional
    date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model ("Product", productSchema); // Capitalized model name for convention

export default productModel; // Added export to make the model usable