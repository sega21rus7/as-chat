import express from "express";
import {
  users as usersController,
  editUser as editUserController,
  deleteUser as deleteUserController,
} from "./controllers";

const router = express.Router();

router.post("/users", usersController);
router.post("/user/edit", editUserController);
router.post("/user/delete", deleteUserController);

export default router;