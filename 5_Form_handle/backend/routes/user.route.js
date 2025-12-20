import {registerUser,loginUser,getAllUsers} from "../controllers/user.controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUser").get(authMiddleware,getAllUsers);




export default router