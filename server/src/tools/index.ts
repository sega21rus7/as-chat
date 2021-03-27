/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bcrypt from "bcryptjs";
import config from "config";
import { IUser } from "modules/auth/models/User";
import { IDialog } from "modules/chat/dialogs/models/Dialog";

export const handleError = (res: express.Response, err: Error): unknown => {
  console.log(err.message || err);
  return res.status(500).end(err.message || err);
};

export const generatePassword = (password: string): string => {
  return bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(config.jwt.salt)
  );
};

export const isPasswordsEqual = (pass1: string, pass2: string): boolean => {
  return bcrypt.compareSync(pass1, pass2);
};