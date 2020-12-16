import express from "express";
import mongoose from "mongoose";
import User from "../auth/models/User";

export const users = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).end(err.message);
  }
};

export const editUser = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    const _id = mongoose.Types.ObjectId(req.body._id);
    await User.updateOne({ _id }, req.body);
    return res.status(200).end("Пользователь успешно обновлен.");
  } catch (err) {
    console.log(err);
    res.status(500).end(err.message);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    const _id = mongoose.Types.ObjectId(req.body._id);
    await User.deleteOne({ _id });
    return res.status(200).end("Пользователь успешно удален.");
  } catch (err) {
    console.log(err);
    res.status(500).end(err.message);
  }
};