/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import { handleError } from "tools";
import Message from "./models/Message";
import { UserType } from "modules/auth/models/User";
import mongoose from "mongoose";
import Dialog from "../dialogs/models/Dialog";
import { CustomRequest } from "tools/interfaces";

interface EditRequestType extends CustomRequest {
  body: {
    text: string;
  }
}

interface CreateRequestType extends EditRequestType {
  body: {
    text: string;
    dialog: string;
  }
}

export const getMessages = async (req: CustomRequest, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.dialogID) {
      throw new Error("ID диалога не может быть пустым!");
    }
    // @ts-expect-error
    const messages = await Message.find({
      dialog: mongoose.Types.ObjectId(req.params.dialogID),
    }).sort({ updatedAt: 1 });
    return res.status(200).json({ messages });
  } catch (err) {
    handleError(res, err);
  }
};

export const createMessage = async (req: CreateRequestType, res: express.Response): Promise<unknown> => {
  try {
    if (!req.body.text) {
      throw new Error("Текст сообщения не может быть пустым!");
    }
    if (!req.body.dialog) {
      throw new Error("Не указан диалог!");
    }
    const userID = (req.user as UserType)._id;
    const message = new Message({
      author: userID,
      text: req.body.text,
      dialog: mongoose.Types.ObjectId(req.body.dialog),
    });
    await message.save();
    await Dialog.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.dialog) },
      { $push: { messages: message._id } }
    );
    req.io?.emit("MESSAGE_CREATED", { message });
    return res.status(201).json({ message });
  } catch (err) {
    handleError(res, err);
  }
};

export const editMessage = async (req: EditRequestType, res: express.Response): Promise<unknown> => {
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

export const deleteMessage = async (req: CustomRequest, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.id) {
      throw new Error("ID сообщения не может быть пустым!");
    }
    const message = await Message.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (!message) {
      throw new Error("Сообщение не существует!");
    }
    // при удалении сообщения надо удалять его ид также и из диалога
    await Dialog.updateOne(
      { _id: message.dialog },
      { $pull: { messages: mongoose.Types.ObjectId(req.params.id) } }
    );
    return res.status(200).json({ message });
  } catch (err) {
    handleError(res, err);
  }
};

