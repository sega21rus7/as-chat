import express from "express";
import socketIO from "socket.io";
import { IUser } from "modules/auth/models/User";

export interface IRequest extends express.Request {
  user?: IUser;
  io?: socketIO.Server;
}

