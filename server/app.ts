import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import passportMiddleware, { hanldeUnauthorized } from "./middlewares/passport";
import { checkJWT } from "./tools";
import authRouter from "./modules/auth/routes";
import adminRouter from "./modules/admin/routes";
import profileRouter from "./modules/profile/routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
passportMiddleware(passport);
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require("cors")());

app.use("/api/auth", authRouter);
app.use("/api/admin", checkJWT(), adminRouter, hanldeUnauthorized);
app.use("/api/profile", checkJWT(), profileRouter, hanldeUnauthorized);

export default app;