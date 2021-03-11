import express from "express";
import authMiddleware from "middlewares/auth";
import {
  changePassword as changePasswordController,
  getUser as getUserController,
  editUser as editUserController,
} from "./controllers";

const router = express.Router();

router.post("/change_password", authMiddleware, changePasswordController);
router.get("/", authMiddleware, getUserController);
router.put("/", authMiddleware, editUserController);

export default router;