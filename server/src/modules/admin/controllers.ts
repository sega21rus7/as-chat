import express from "express";
import mongoose from "mongoose";
import { handleError } from "tools";
import User from "modules/auth/models/User";

interface IEditUserRequest extends express.Request {
  body: {
    _id: string;
  }
}

interface IDeleteUserRequest extends IEditUserRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any,
}

export const users = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json({ users });
  } catch (err) {
    handleError(res, err);
  }
};

export const editUser = async (req: IEditUserRequest, res: express.Response): Promise<unknown> => {
  try {
    const _id = mongoose.Types.ObjectId(req.body._id);
    await User.updateOne({ _id }, req.body);
    return res.status(200).end("Пользователь успешно обновлен.");
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteUser = async (req: IDeleteUserRequest, res: express.Response): Promise<unknown> => {
  try {
    if (req.body._id === req.user._id + "") {
      return res.status(400).end("Вы не можете удались самого себя!");
    }
    const _id = mongoose.Types.ObjectId(req.body._id);
    await User.deleteOne({ _id });
    return res.status(200).end("Пользователь успешно удален.");
  } catch (err) {
    handleError(res, err);
  }
};