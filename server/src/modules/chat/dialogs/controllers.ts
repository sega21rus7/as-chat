/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import mongoose from "mongoose";
import { UserType } from "modules/auth/models/User";
import { handleError } from "tools";
import Message from "../messages/models/Message";
import Dialog from "./models/Dialog";

interface CreateRequestType extends express.Request {
  body: {
    companion: string;
    messageText: string;
  }
}

export const createDialog = async (req: CreateRequestType, res: express.Response): Promise<unknown> => {
  try {
    const userID = (req.user as UserType)._id;
    if (!req.body.companion) {
      throw new Error("Отсутствует собеседник для диалога!");
    }
    if (!req.body.messageText) {
      throw new Error("Сообщение не может быть пустым!");
    }
    const dialog = new Dialog({
      author: userID,
      companion: req.body.companion,
    });
    await dialog.save();
    const message = new Message({
      author: userID,
      text: req.body.messageText,
      dialog: dialog._id,
    });
    await message.save();
    const dialogWithMessage = await Dialog.findOneAndUpdate(
      { _id: dialog._id },
      { messages: [message._id] },
      { new: true }
    );
    return res.status(201).json({ dialogWithMessage });
  } catch (err) {
    handleError(res, err);
  }
};

export const getDialogs = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    const userID = (req.user as UserType)._id;
    const dialogs = await Dialog.find({
      // @ts-expect-error
      $or: [
        { author: mongoose.Types.ObjectId(userID) },
        { companion: mongoose.Types.ObjectId(userID) },
      ],
    })
      .slice("messages", -1)
      .populate("messages")
      .populate({ path: "author", select: "_id email login" })
      .populate({ path: "companion", select: "_id email login" });
    return res.status(200).json({ dialogs });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteDialog = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.dialogID) {
      throw new Error("ID диалога не может быть пустым!");
    }
    const dialog = await Dialog.findOneAndDelete({
      _id: mongoose.Types.ObjectId(req.params.dialogID),
    });
    if (!dialog) {
      throw new Error("Диалог не найден!");
    }
    await Message.deleteMany({ dialog: dialog._id });
    return res.status(200).json({ dialog });
  } catch (err) {
    handleError(res, err);
  }
};