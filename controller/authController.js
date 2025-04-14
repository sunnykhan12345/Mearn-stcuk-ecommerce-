import { comparePassword, hasPassword } from "../helpers/autHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({ message: "Please fill all the fields " });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }
    const hashedPassword = await hasPassword(password);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "New user created successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in registration", success: false, error });
  }
};
// for login

// export const loginController = async(req,res) =>{
//     console.log("Login API hit");
//     try{
//         const {email,password}= req.body;
//         if(!email || !password){
//             return res.status(404).json({message:"Invlaid Email and Password"})
//         }
//         const user = await userModel.findOne({email});
//         if(!user){
//             return res.status(400).json({message:"user not existx"})
//         }
//          const match = await comparePassword(password, user.password);
//          if(!match){
//             return res.status(400).json({message:"Invalid Password"})
//          }
// // token
//   const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   res.status(200).json({message:"Login Successsfull",
//     user:{
//         name:user.name,
//         email:user.email,
//         phone:user.phone,
//         role:user.role
//     },
//     token})

//     }
//     catch(error){
//         console.log(error)
//         return res.status(200).json({message:"error in login",success:false})
//     }
// }
export const loginController = async (req, res) => {
  console.log("Login API hit", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(404).json({ message: "Invalid Email or Password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not exists" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Login successful");

    res.status(200).json({
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error in login:", error);
    return res.status(500).json({ message: "Error in login", success: false });
  }
};
