/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import passport from "passport";

export const handleError = (res: express.Response, err: Error): unknown => {
  console.log(err.message || err);
  return res.status(500).end(err.message || err);
};

export const passportMiddleware = (): any => {
  return passport.authenticate("jwt", { session: false });
};