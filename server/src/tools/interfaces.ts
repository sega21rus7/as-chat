import express from "express";
import socketIO from "socket.io";
import { UserType } from "modules/auth/models/User";

export interface CustomRequest extends express.Request {
  user?: UserType;
  io?: socketIO.Server;
}

