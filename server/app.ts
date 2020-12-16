import express from "express";
import authRouter from "./modules/auth/routes";
import adminRouter from "./modules/admin/routes";
import bodyParser from "body-parser";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
passportMiddleware(passport);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

export default app;