import express from "express";
import {
  createMessage as createController,
  deleteMessage as deleteController,
  editMessage as editController,
} from "./controllers";

const router = express.Router();

router.post("/", createController);
router.put("/:id", editController);
router.delete("/:id", deleteController);

export default router;