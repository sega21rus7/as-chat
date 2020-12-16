import express from "express";
import { passportMiddleware } from "../../utils";
import {
  users as usersController,
  editUser as editUserController,
  deleteUser as deleteUserController,
} from "./controllers";

const router = express.Router();

router.use("/users", passportMiddleware(), usersController);
router.use("/user/edit", passportMiddleware(), editUserController);
router.use("/user/delete", passportMiddleware(), deleteUserController);

export default router;