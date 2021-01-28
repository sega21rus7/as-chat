import express from "express";
import {
  users as usersController,
  editUser as editUserController,
  deleteUser as deleteUserController,
} from "./controllers";

const router = express.Router();

router.use("/users", usersController);
router.use("/user/edit", editUserController);
router.use("/user/delete", deleteUserController);

export default router;