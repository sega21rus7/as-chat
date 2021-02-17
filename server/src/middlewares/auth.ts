/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";
import express from "express";
import config from "config";

export default (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    if (req.method === "options") {
      next();
    }
    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get("jwt");
    const decoded = jwt.verify(token, config.jwt.secretOrKey);
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json("Вы не авторизованы");
  }
};