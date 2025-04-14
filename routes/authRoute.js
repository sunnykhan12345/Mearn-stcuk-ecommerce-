// import express from "express"
// import {loginController, registerController} from "../controller/authController.js"
// const router = express.Router()

// // Routing
// // REGISTER METHOD
// router.post("/register", registerController);
// router.post("/login", loginController)

// export default routerimport express from "express";
import express from "express";
import {
  loginController,
  registerController,
  textController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

// TEST ROUTES
router.get("/test", requireSignIn,isAdmin,textController);
export default router;
