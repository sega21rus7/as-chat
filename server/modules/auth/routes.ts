import express from "express";
import { login as loginController, register as regController } from "./controllers";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", regController);

export default router;