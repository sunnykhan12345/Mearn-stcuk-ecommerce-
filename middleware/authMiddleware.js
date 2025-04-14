import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to protect routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Admin middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "You are not an admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: error.message,
    });
  }
};
