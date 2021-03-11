import express from "express";
import authMiddleware from "middlewares/auth";
import {
  login as loginController,
  register as regController,
  getAllUsers as getAllUsersController,
} from "./controllers";

const router = express.Router();

router.use("/login", loginController);
router.use("/register", regController);
router.use("/users", authMiddleware, getAllUsersController);

export default router;