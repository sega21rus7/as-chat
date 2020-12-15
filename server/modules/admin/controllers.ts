import express from "express";
import User from "../auth/models/User";

export const users = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).end(err.message);
  }
};