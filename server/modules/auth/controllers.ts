import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User";
import config from "../../config";
import { handleError, generatePassword, isPasswordsEqual } from "../../tools";

interface IRequest extends express.Request {
  body: {
    email: string;
    login: string;
    password: string;
  }
}

export const login = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    let candidate = await User.findOne({ login: req.body.login });
    if (!candidate) {
      candidate = await User.findOne({ email: req.body.login });
    }
    if (!candidate) {
      return res.status(404).end("Пользователь не найден.");
    }
    const passwordsEquals = isPasswordsEqual(req.body.password, candidate.password);
    if (!passwordsEquals) {
      return res.status(401).end("Неверный пароль.");
    }
    // генерируем токен
    const token = jwt.sign({
      _id: candidate._id,
      email: candidate.email,
      login: candidate.login,
    }, config.jwt.secretOrKey, {
      expiresIn: config.jwt.expiresIn, // час
    });
    return res.status(200).json({ token: `Bearer ${token}` });
  } catch (err) {
    handleError(res, err);
  }
};

export const register = async (req: IRequest, res: express.Response): Promise<unknown> => {
  try {
    let candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
      return res.status(400).end("Пользователь c таким email уже зарегистрирован.");
    }
    candidate = await User.findOne({ login: req.body.login });
    if (candidate) {
      return res.status(400).end("Пользователь c таким логином уже зарегистрирован.");
    }
    const user = new User({
      email: req.body.email,
      login: req.body.login,
      password: generatePassword(req.body.password),
    });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    handleError(res, err);
  }
};