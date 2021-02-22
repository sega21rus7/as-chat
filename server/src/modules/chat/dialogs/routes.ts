import express from "express";
import {
  createDialog as createController,
  deleteDialog as deleteController,
  getDialogs as getController,
} from "./controllers";

const router = express.Router();

router.get("/:userID", getController);
router.post("/", createController);
router.delete("/:dialogID", deleteController);

export default router;