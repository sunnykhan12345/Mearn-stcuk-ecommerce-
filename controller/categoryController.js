import slugify from "slugify";
import categoryModel from "../models/cetegoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).json({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = new categoryModel({
      name,
      slug: slugify(name),
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Category creation error:", error);
    res.status(500).send({
      success: false,
      message: "Error in category creation",
      error: error.message,
    });
  }
};

// update api
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        error,
        message: "Error in a updateing category",
      });
  }
};

// get all categories api
export const getallCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching categories",
    });
  }
};

// get single category  api
export const singleCategotyController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).json({
      success: true,
      message: "single Category fetched successfully",
      category: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching categories",
    });
  }
};

// delete category api
export const deleteCategotyController = async(req,res) =>{
  try{
    const{id} = req.params
    const category = await categoryModel.findByIdAndDelete(id)
    res.status(200).json({
      success:true,
      message:"Category deleted successfully",
      category
    })
  }
    catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting categories",
    });
  }
}
