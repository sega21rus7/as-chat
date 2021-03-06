import socketIO from "socket.io";
import express from "express";
import { IRequest } from "tools/interfaces";

export default (io: socketIO.Server) => {
  return (req: IRequest, res: express.Response, next: express.NextFunction): void => {
    try {
      req.io = io;
      next();
    } catch (err) {
      res.status(404).end(err.message || err);
    }
  };
};