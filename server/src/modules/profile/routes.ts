import express from "express";
import {
  changePassword as changePasswordController,
  getUser as getUserController,
  editUser as editUserController,
} from "./controllers";

const router = express.Router();

router.post("/change_password", changePasswordController);
router.get("/", getUserController);
router.put("/", editUserController);

export default router;