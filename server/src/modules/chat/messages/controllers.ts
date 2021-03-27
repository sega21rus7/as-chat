/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import { handleError } from "tools";
import Message from "./models/Message";
import { IUser } from "modules/auth/models/User";
import mongoose from "mongoose";
import Dialog from "../dialogs/models/Dialog";
import { IRequest } from "tools/interfaces";
import socketEvents from "core/socket/events";

interface IEditRequest extends IRequest {
  body: {
    text: string;
  }
}

interface ICreateRequest extends IEditRequest {
  body: {
    text: string;
    dialog: string;
  }
}

export const getMessages = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.dialogID) {
      throw new Error("ID диалога не может быть пустым!");
    }
    // @ts-expect-error
    const messages = await Message.find({
      dialog: mongoose.Types.ObjectId(req.params.dialogID),
    }).sort({ updatedAt: 1 }).populate("author");
    return res.status(200).json({ messages });
  } catch (err) {
    handleError(res, err);
  }
};

export const createMessage = async (req: ICreateRequest, res: express.Response): Promise<unknown> => {
  try {
    if (!req.body.text || !req.body.text.trim()) {
      throw new Error("Текст сообщения не может быть пустым!");
    }
    if (!req.body.dialog) {
      throw new Error("Не указан диалог!");
    }
    const userID = (req.user as IUser)._id;
    const message = new Message({
      author: userID,
      text: req.body.text,
      dialog: mongoose.Types.ObjectId(req.body.dialog),
    });
    await message.save();
    const dialog = await Dialog.findOne({ _id: mongoose.Types.ObjectId(req.body.dialog) });
    if (!dialog) {
      throw new Error("Диалог не существует!");
    }
    await dialog
      // @ts-ignore
      .updateOne({ lastMessage: message._id, $inc: { hasNotReadMessagesCount: 1 } })
      .exec();
    const populated = await message.populate("author").execPopulate();
    req.io?.to(req.body.dialog) // в сам диалог
      .to(dialog.author.toString()) // для обоих собеседников для обновления списка диалогов
      .to(dialog.companion.toString())
      .emit(socketEvents.sendMessage, populated);
    const targetUser = userID === dialog.author ? dialog.companion : dialog.author;
    req.io?.to(targetUser.toString()).emit(socketEvents.sendMessageForUpdateHasRead, populated);
    return res.status(201).json({ message: populated });
  } catch (err) {
    handleError(res, err);
  }
};

export const editMessage = async (req: IEditRequest, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.id) {
      throw new Error("ID сообщения не может быть пустым!");
    }
    if (!req.body.text) {
      throw new Error("Текст сообщения не может быть пустым!");
    }
    const message = await Message.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { text: req.body.text },
      { new: true }
    );
    return res.status(200).json({ message });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteMessage = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.id) {
      throw new Error("ID сообщения не может быть пустым!");
    }
    const message = await Message.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (!message) {
      throw new Error("Сообщение не существует!");
    }
    const count = await Message.find({ dialog: message.dialog }).countDocuments();
    if (count <= 1) {
      throw new Error("Невозможно удалить последнее сообщение. Удалите диалог целиком.");
    }
    const dialog = await Dialog.findOne({ _id: message.dialog });
    if (!dialog) {
      throw new Error("Диалог не существует!");
    }
    await message.deleteOne();
    let isLast = false;
    if (message._id.equals(dialog.lastMessage)) {
      const lastMessage = await Message
        .findOne({ dialog: dialog?._id })
        .sort({ createdAt: -1 });
      lastMessage && await dialog.updateOne({ lastMessage: lastMessage._id }).exec();
      isLast = true;
    }
    const populated = await message.populate("author").execPopulate();
    req.io?.to(message.dialog.toString()) // в сам диалог
      .to(dialog.author.toString()) // для обоих собеседников для обновления списка диалогов
      .to(dialog.companion.toString())
      .emit(socketEvents.deleteMessage, populated, isLast);
    return res.status(200).json({ message });
  } catch (err) {
    handleError(res, err);
  }
};

