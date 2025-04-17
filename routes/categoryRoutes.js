import express from "express"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

// routes
router.post("/create-category", requireSignIn,isAdmin,createCategoryController)
// update routes
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

export default router