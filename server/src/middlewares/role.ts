/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { UserRoles } from "modules/auth/models/Role";
import { UserType } from "modules/auth/models/User";
import { CustomRequest } from "tools/interfaces";

export default (role: UserRoles) => {
  return (req: CustomRequest, res: express.Response, next: express.NextFunction): void => {
    try {
      if (req.user && (req.user as UserType).roles.includes(role)) {
        next();
      } else {
        throw new Error("Нет прав доступа. Обратитесь к администрации.");
      }
    } catch (err: any) {
      res.status(403).end(err.message || err);
    }
  };
};