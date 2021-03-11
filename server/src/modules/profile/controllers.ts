import express from "express";
import mongoose from "mongoose";
import User from "modules/auth/models/User";
import { handleError, generatePassword, isPasswordsEqual } from "tools";
import { IRequest } from "tools/interfaces";
import { IUser } from "modules/auth/models/User";

interface IChangePasswordRequest extends IRequest {
  body: {
    oldPassword: string,
    password: string,
    repeatPassword: string,
  }
}

export const editUser = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    const _id = req.user && mongoose.Types.ObjectId(req.user._id);
    await User.updateOne({ _id }, req.body);
    return res.status(200).end("Данные успешно обновлены!");
  } catch (err) {
    handleError(res, err);
  }
};

export const getUser = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    const _id = (req.user as IUser)._id;
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(_id) });
    return res.status(200).json({ user });
  } catch (err) {
    handleError(res, err);
  }
};

export const changePassword = async (req: IChangePasswordRequest, res: express.Response): Promise<unknown> => {
  try {
    if (req.body.password !== req.body.repeatPassword) {
      return res.status(400).end("Пароли должны совпадать!");
    }
    const _id = req.user && mongoose.Types.ObjectId(req.user._id);
    const user = await User.findOne({ _id });
    if (user && isPasswordsEqual(req.body.oldPassword, user.password)) {
      await user.updateOne({ password: generatePassword(req.body.password) });
      res.status(200).end("Пароль успешно изменен");
    } else {
      res.status(400).end("Старый пароль введен неверно.");
    }
  } catch (err) {
    handleError(res, err);
  }
};
