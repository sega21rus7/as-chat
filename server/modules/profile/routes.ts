import express from "express";
import { passportMiddleware } from "../../tools";
import {
  changePassword as changePasswordController,
  getUserInfo as getUserInfoController,
  editUser as editUserController,
} from "./controllers";

const router = express.Router();

router.use("/change_password", passportMiddleware(), changePasswordController);
router.use("/user/info", passportMiddleware(), getUserInfoController);
router.use("/user/edit", passportMiddleware(), editUserController);

export default router;