import express, { Router } from "express";
import socketIO from "socket.io";
import authMiddleware from "middlewares/auth";
import {
  login as loginController,
  register as regController,
  getAllUsers as getAllUsersController,
} from "./controllers";

export default (io: socketIO.Server): Router => {
  const router = express.Router();

  router.use("/login", loginController);
  router.use("/register", regController);
  router.use("/users", authMiddleware(io), getAllUsersController);
  return router;
};