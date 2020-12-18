import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import authRouter from "./modules/auth/routes";
import adminRouter from "./modules/admin/routes";
import profileRouter from "./modules/profile/routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
passportMiddleware(passport);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/profile", profileRouter);

export default app;