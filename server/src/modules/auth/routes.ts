import express from "express";
import authMiddleware from "middlewares/auth";
import {
  login as loginController,
  register as regController,
  getUser as getUserController,
} from "./controllers";

const router = express.Router();

router.use("/login", loginController);
router.use("/register", regController);
router.use("/getUser", authMiddleware, getUserController);

export default router;