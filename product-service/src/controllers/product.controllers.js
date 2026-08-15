import { Product } from "../model/product.model.js";
import ApiResponse from "../utlis/api.response.js";
import asyncHandler from "../utlis/asyncHandler.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfully")
    );
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, fullName, price, description } = req.body;

    const product = await Product.create({ name, fullName, price, description });

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

export { getProducts, createProduct };
