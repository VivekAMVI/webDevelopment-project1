import Product from "../models/product.model.js"
import mongoose from "mongoose";
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const createProduct = async(req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};
export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    // if (!mongoose.Types.ObjectId(id)) {
    //     return res.status(404).json({ success: false, message: "product not found" });
    // }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
};
export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "id not found" });
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
};