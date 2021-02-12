/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import config from "config";

export const handleError = (res: express.Response, err: Error): unknown => {
  console.log(err.message || err);
  return res.status(500).end(err.message || err);
};

export const checkJWT = (): any => {
  return passport.authenticate("jwt", { session: false, failWithError: true }
  );
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