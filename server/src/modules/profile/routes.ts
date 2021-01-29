import express from "express";
import {
  changePassword as changePasswordController,
  getUserInfo as getUserInfoController,
  editUser as editUserController,
} from "./controllers";

const router = express.Router();

router.use("/change_password", changePasswordController);
router.use("/user/info", getUserInfoController);
router.use("/user/edit", editUserController);

export default router;