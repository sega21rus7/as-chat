import express from "express";
import {
  createMessage as createMessageController,
  deleteMessage as deleteMessageController,
  editMessage as editMessageController,
  getMessages as getMessagesController,
} from "./messages/controllers";
import {
  createDialog as createDialogController,
  deleteDialog as deleteDialogController,
  getDialogs as getDialogsController,
} from "./dialogs/controllers";

const router = express.Router();

router.get("/:dialogID", getMessagesController);
router.post("/", createMessageController);
router.put("/:id", editMessageController);
router.delete("/:id", deleteMessageController);

router.get("/", getDialogsController);
router.post("/", createDialogController);
router.delete("/:dialogID", deleteDialogController);

export default router;