/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import mongoose from "mongoose";
import { IUser } from "modules/auth/models/User";
import { handleError } from "tools";
import Message from "../messages/models/Message";
import Dialog from "./models/Dialog";
import { IRequest } from "tools/interfaces";
import socketEvents from "core/socket/events";

interface ICreateRequest extends IRequest {
  body: {
    companion: string;
    messageText: string;
  }
}

export const createDialog = async (req: ICreateRequest, res: express.Response): Promise<unknown> => {
  try {
    const userID = (req.user as IUser)._id;
    if (!req.body.companion) {
      throw new Error("Отсутствует собеседник для диалога!");
    }
    if (!req.body.messageText || !req.body.messageText.trim()) {
      throw new Error("Сообщение не может быть пустым!");
    }
    const exists = await Dialog.findOne({
      $or: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { author: userID, companion: mongoose.Types.ObjectId(req.body.companion) as any },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { companion: userID, author: mongoose.Types.ObjectId(req.body.companion) as any },
      ],
    });
    if (exists) {
      throw new Error("Диалог уже существует!");
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
    // findOneAndUpdate
    await Dialog.updateOne(
      { _id: dialog._id },
      { lastMessage: message._id },
    );
    const populated = await Dialog.findOne({ _id: mongoose.Types.ObjectId(dialog._id) })
      .populate(["author", "companion", "lastMessage"]);
    req.io?.to(req.body.companion).to(userID).emit(socketEvents.createDialog, populated);
    return res.status(201).json({ dialog: populated });
  } catch (err) {
    handleError(res, err);
  }
};

export const getDialogs = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    const userID = (req.user as IUser)._id;
    const dialogs = await Dialog.find(
      {
        // @ts-ignore
        $or: [
          { author: mongoose.Types.ObjectId(userID) },
          { companion: mongoose.Types.ObjectId(userID) },
        ],
      },
    )
      .populate(["lastMessage", "author", "companion"]);
    return res.status(200).json({ dialogs });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteDialog = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    const userID = (req.user as IUser)._id;
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
    console.log("dialog.companion", dialog.companion);
    req.io?.to(dialog.companion.toString()).to(userID).emit(socketEvents.deleteDialog, dialog);
    return res.status(200).json({ dialog });
  } catch (err) {
    handleError(res, err);
  }
};