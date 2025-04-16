// import slugify from "slugify";
// import categoryModel from "../models/cetegoryModel.js"
// export const createCategoryController = async(req, res) => {
//     try{
//         const  {name} = req.body
//         if(!name){
//             return res.status(401).json("name is required")
//         }
//         const existingcategory = await categoryModel({name})
//         if(existingcategory){
//             return res.status(401).json({message:"category already exist"})
//         }
//         const newCategory = await categoryModel({name,slug:slugify(name).save()})
//         return res.status(201).json({message:"category created..",newCategory})
//     }
//     catch(error){
//         console.log(error)
//          res.status(500).send({success:false,error,message:"error in Category"});
//     }
// };
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
