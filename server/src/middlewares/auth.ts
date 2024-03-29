/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";
import express from "express";
import socketIO from "socket.io";
import config from "config";
import socketEvents from "core/socket/events";
import { IRequest } from "tools/interfaces";
import { IUser } from "modules/auth/models/User";

export default (io: socketIO.Server) => {
  return (req: IRequest, res: express.Response, next: express.NextFunction): void => {
    try {
      if (req.method === "options") {
        next();
      }
      const cookies = new Cookies(req.headers.cookie);
      const token = cookies.get("jwt");
      const decoded = jwt.verify(token, config.jwt.secretOrKey);
      if (typeof decoded !== "string") {
        req.user = decoded as IUser;
      }
      next();
    } catch (err: any) {
      res.status(401).end("Вы не авторизованы");
      io.emit(socketEvents.UNAUTHORIZED);
    }
  };
};