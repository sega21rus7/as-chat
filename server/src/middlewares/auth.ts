/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";
import express from "express";
import config from "config";
import { CustomRequest } from "tools/interfaces";
import { UserType } from "modules/auth/models/User";

export default (req: CustomRequest, res: express.Response, next: express.NextFunction): void => {
  try {
    if (req.method === "options") {
      next();
    }
    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get("jwt");
    const decoded = jwt.verify(token, config.jwt.secretOrKey);
    if (typeof decoded !== "string") {
      req.user = decoded as UserType;
    }
    next();
  } catch (err: any) {
    res.status(401).end("Вы не авторизованы");
  }
};