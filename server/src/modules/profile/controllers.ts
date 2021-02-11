import express from "express";
import mongoose from "mongoose";
import User from "modules/auth/models/User";
import { handleError, generatePassword, isPasswordsEqual } from "../../tools";

interface GetUserInfoRequestType extends express.Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any,
}

interface ChangePasswordRequestType extends GetUserInfoRequestType {
  body: {
    old_password: string,
    password1: string,
    password2: string,
  }
}

export const editUser = async (req: GetUserInfoRequestType, res: express.Response): Promise<unknown> => {
  try {
    const _id = req.user && mongoose.Types.ObjectId(req.user._id);
    await User.updateOne({ _id }, req.body);
    return res.status(200).end("Данные успешно обновлены!");
  } catch (err) {
    handleError(res, err);
  }
};

export const getUserInfo = async (req: GetUserInfoRequestType, res: express.Response): Promise<unknown> => {
  try {
    const _id = req.user && mongoose.Types.ObjectId(req.user._id);
    const user = await User.findOne({ _id });
    return res.status(200).json({ user });
  } catch (err) {
    handleError(res, err);
  }
};

export const changePassword = async (req: ChangePasswordRequestType, res: express.Response): Promise<unknown> => {
  try {
    if (req.body.password1 !== req.body.password2) {
      return res.status(400).end("Пароли должны совпадать!");
    }
    const _id = req.user && mongoose.Types.ObjectId(req.user._id);
    const user = await User.findOne({ _id });
    if (user && isPasswordsEqual(req.body.old_password, user.password)) {
      await user.updateOne({ password: generatePassword(req.body.password1) });
      res.status(200).json("Пароль успешно изменен");
    } else {
      res.status(400).end("Старый пароль введен неверно.");
    }
  } catch (err) {
    handleError(res, err);
  }
};
