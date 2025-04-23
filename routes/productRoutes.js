import express from "express";
import productController, {
  getAllProductController,
  getPhotoController,
  getSingleProductController,
  productDeleteController,
  updateProductController,
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
// PUT method is ideal for updates
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  updateProductController
);
// getall products routes
router.get("/get-all-products", getAllProductController);
// get single produc
router.get("/get-single-product/:slug", getSingleProductController);
// get photo api
router.get("/product-photo/:pid", getPhotoController);
// delete product
router.delete("/product/pid", productDeleteController);

export default router;
