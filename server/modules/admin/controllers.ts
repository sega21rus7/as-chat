import express from "express";
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
    await User.findOneAndUpdate({ _id: req.body._id }, req.body, {
      upsert: true,
    }, err => {
      if (err) {
        return res.status(400).end(err);
      }
      return res.status(200).end("Пользователь успешно обновлен.");
    });
    return res.end();
  } catch (err) {
    console.log(err);
    res.status(500).end(err.message);
  }
};