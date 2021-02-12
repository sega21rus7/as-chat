import express from "express";
import { login as loginController, register as regController } from "./controllers";

const router = express.Router();

router.use("/login", loginController);
router.use("/register", regController);

export default router;