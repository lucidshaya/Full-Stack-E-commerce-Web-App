// controllers/productController.js
import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/ProductModel.js';

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        if (!name || !description || !price || !category || !image1) {
            return res.status(400).json({ success: false, message: 'Required fields are missing' });
        }

        const images = [image1, image2, image3, image4].filter(Boolean).map(file => file.path);
        const uploadedImages = await Promise.all(
            images.map(path => cloudinary.uploader.upload(path))
        );
        const imagesURL = uploadedImages.map(img => img.secure_url);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true',
            sizes: sizes ? JSON.parse(sizes) : [],
            image: imagesURL,
            date: Date.now()
        };

        const product = new Product(productData);
        await product.save();

        res.json({ success: true, message: 'Product added' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const listProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};