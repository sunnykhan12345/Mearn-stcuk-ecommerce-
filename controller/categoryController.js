
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
export const updateCategoryController =async (req,res) =>{
  try{
    const{name} = req.body
    const{id}= req.params
    const category = await categoryModel.findByIdAndUpdate(id,{slug:slugify(name)},{new:true})
    res.status(200).send({
      success:true,
      message:"Category updated successfully",
      category:category
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({success:false,error, message:"Error in a updateing category"})
  }

}