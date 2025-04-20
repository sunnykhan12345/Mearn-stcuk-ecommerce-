import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import formidable from "formidable";
import { count, log } from "console";

const productController = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Form parsing error",
        error: err.message,
      });
    }

    const { name, description, category, quantity, price, shipping } = fields;
    const { photo } = files;

    // ✅ Validations
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    } else if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    } else if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    } else if (quantity === undefined || isNaN(quantity)) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be a number" });
    } else if (price === undefined || isNaN(price)) {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a number" });
    } else if (shipping === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Shipping is required" });
    } else if (!photo || !photo.path || photo.size === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is required" });
    }

    // Optional: check file type and size
    // if (!["image/jpeg", "image/png"].includes(photo.type)) {
    //   return res.status(400).json({ success: false, message: "Only JPEG or PNG images allowed" });
    // }
    // if (photo.size > 2 * 1024 * 1024) {
    //   return res.status(400).json({ success: false, message: "Image should be less than 2MB" });
    // }

    try {
      const product = new productModel({
        ...fields,
        slug: slugify(name),
      });

      // Reading file correctly from the Temp path
      if (photo && photo.path) {
        const fileData = fs.readFileSync(photo.path);
        product.photo.data = fileData;
        product.photo.contentType = photo.type;
      }

      await product.save();

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error saving product",
        error: error.message,
      });
    }
  });
};

export default productController;

// get all product

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      counttotla: products.length,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res.status(200).json({
      success: true,
      product,
      message: "single product get successed",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error fetching single  product",
    });
  }
};

export const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product && product.photo && product.photo.data) {
      res.set("Content-Type", product.photo.contentType); 
      return res.status(200).send(product.photo.data); 
    } else {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching photo",
    });
  }
};
