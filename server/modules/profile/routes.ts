import express from "express";
import { passportMiddleware } from "../../tools";
import {
  changePassword as changePasswordController,
} from "./controllers";

const router = express.Router();

router.use("/change_password", passportMiddleware(), changePasswordController);

export default router;