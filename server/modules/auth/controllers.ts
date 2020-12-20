import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User";
import config from "../../config";
import { handleError, generatePassword, isPasswordsEqual } from "../../tools";

interface ILoginRequest extends express.Request {
  body: {
    login: string;
    password: string;
  }
}

interface IRegRequest extends ILoginRequest {
  body: {
    login: string;
    password: string;
    email: string;
    lastName: string;
    firstName: string;
    middleName: string;
  }
}

export const login = async (req: ILoginRequest, res: express.Response): Promise<unknown> => {
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
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + config.jwt.timezoneDiffNum + config.jwt.expiresInNum),
      secure: false, // todo prod true
      httpOnly: false, //
    });
    return res.status(200).end();
  } catch (err) {
    handleError(res, err);
  }
};

export const register = async (req: IRegRequest, res: express.Response): Promise<unknown> => {
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
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      password: generatePassword(req.body.password),
      regDate: new Date(),
    });
    await user.save();
    return res.status(201).end();
  } catch (err) {
    handleError(res, err);
  }
};