/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { UserRoles } from "modules/auth/models/Role";
import { IUser } from "modules/auth/models/User";
import { IRequest } from "tools/interfaces";

export default (role: UserRoles) => {
  return (req: IRequest, res: express.Response, next: express.NextFunction): void => {
    try {
      if (req.user && (req.user as IUser).roles.includes(role)) {
        next();
      } else {
        throw new Error("Нет прав доступа. Обратитесь к администрации.");
      }
    } catch (err: any) {
      res.status(403).end(err.message || err);
    }
  };
};