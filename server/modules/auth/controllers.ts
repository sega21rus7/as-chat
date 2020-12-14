import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User";
import config from "../../config";

export const login = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    let candidate = await User.findOne({ login: req.body.login });
    if (!candidate) {
      candidate = await User.findOne({ email: req.body.login });
    }
    if (!candidate) {
      return res.status(400).json({ "errorMessage": "Пользователь не найден." });
    }
    const passwordsEquals = bcrypt.compareSync(req.body.password, candidate.password);
    if (!passwordsEquals) {
      return res.status(401).json({ "errorMessage": "Неверный пароль." });
    }
    // генерируем токен
    const token = jwt.sign({
      id: candidate._id,
      email: candidate.email,
      login: candidate.login,
    }, config.jwt, {
      expiresIn: 60 * 60, // час
    });
    res.status(200).json({ token: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ "errorMessage": err.message });
  }
};

export const register = async (req: express.Request, res: express.Response): Promise<unknown> => {
  try {
    let candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
      return res.status(400).json({ "errorMessage": "Пользователь c таким email уже зарегистрирован." });
    }
    candidate = await User.findOne({ login: req.body.login });
    if (candidate) {
      return res.status(400).json({ "errorMessage": "Пользователь c таким логином уже зарегистрирован." });
    }
    const user = new User({
      email: req.body.email,
      login: req.body.login,
      password: bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      ),
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "errorMessage": err.message });
  }
};