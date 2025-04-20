import express from "express";
import productController, {
  getAllProductController,
  getPhotoController,
  getSingleProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  //   formidable(),
  productController
);

// getall products routes
router.get("/get-all-products", getAllProductController);
// get single produc
router.get("/get-single-product/:slug", getSingleProductController);
// get photo api
router.get("/product-photo/:pid", getPhotoController)

export default router;
