import express from "express";
import { users as usersController } from "./controllers";

const router = express.Router();

router.post("/users", usersController);

export default router;