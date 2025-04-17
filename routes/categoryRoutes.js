import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  deleteCategotyController,
  getallCategoryController,
  singleCategotyController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

// routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
// update routes
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// getall category
router.get("/get-categories", getallCategoryController);
// get single category
router.get("/single-categories/:slug", singleCategotyController);
// delete category
router.delete(
  "/delete-category/:id",
  deleteCategotyController,
  requireSignIn,
  isAdmin
);

export default router;
