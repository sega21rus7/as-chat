import express from "express";
import { users as usersController, editUser as editUserController } from "./controllers";

const router = express.Router();

router.post("/users", usersController);
router.post("/user/edit", editUserController);

export default router;