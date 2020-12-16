import express from "express";
import passport from "passport";
import {
  users as usersController,
  editUser as editUserController,
  deleteUser as deleteUserController,
} from "./controllers";

const router = express.Router();

router.use("/users", passport.authenticate("jwt", { session: false }), usersController);
router.use("/user/edit", passport.authenticate("jwt", { session: false }), editUserController);
router.use("/user/delete", passport.authenticate("jwt", { session: false }), deleteUserController);

export default router;