import express from "express";
import { handleError } from "tools";
import Message from "./models/Message";
import { UserType } from "modules/auth/models/User";
import mongoose from "mongoose";
import Dialog from "../dialogs/models/Dialog";

interface EditRequestType extends express.Request {
  body: {
    text: string;
  }
}

interface CreateRequestType extends express.Request {
  body: {
    author: string;
    text: string;
    dialog: string;
  }
}

export const createMessage = async (req: CreateRequestType, res: express.Response): Promise<unknown> => {
  try {
    if (!req.body.text) {
      throw new Error("Текст сообщения не может быть пустым!");
    }
    if (!req.body.dialog) {
      throw new Error("Не указан диалог!");
    }
    // const userID = (req.user as UserType)._id;
    const userID = mongoose.Types.ObjectId(req.body.author);
    const message = new Message({
      author: userID,
      text: req.body.text,
      dialog: mongoose.Types.ObjectId(req.body.dialog),
    });
    await message.save();
    await Dialog.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.dialog) },
      { lastMessage: message._id },
    );
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

export const deleteMessage = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    if (!req.params.id) {
      throw new Error("ID сообщения не может быть пустым!");
    }
    const message = await Message.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) });
    return res.status(200).json({ message });
  } catch (err) {
    handleError(res, err);
  }
};

