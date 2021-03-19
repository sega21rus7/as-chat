import express from "express";
import {
  createMessage as createMessageController,
  deleteMessage as deleteMessageController,
  editMessage as editMessageController,
  getMessages as getMessagesController,
  updateHasRead as updateMessagesHadReadController,
} from "./messages/controllers";
import {
  createDialog as createDialogController,
  deleteDialog as deleteDialogController,
  getDialogs as getDialogsController,
} from "./dialogs/controllers";

const router = express.Router();

router.get("/messages/:dialogID", getMessagesController);
router.get("/messages/update_has_read/:dialogID", updateMessagesHadReadController);
router.post("/messages/", createMessageController);
router.put("/messages/:id", editMessageController);
router.delete("/messages/:id", deleteMessageController);

router.get("/dialogs", getDialogsController);
router.post("/dialogs", createDialogController);
router.delete("/dialogs/:dialogID", deleteDialogController);

export default router;