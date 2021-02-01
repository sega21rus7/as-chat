import express from "express";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";
import passportMiddleware, { hanldeUnauthorized } from "./middlewares/passport";
import { checkJWT } from "./tools";
import authRouter from "modules/auth/routes";
import profileRouter from "modules/profile/routes";

const app = express();
const staticPath = path.resolve(process.cwd(), "client_build");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
passportMiddleware(passport);
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require("cors")());

app.use("/api/auth", authRouter);
app.use("/api/profile", checkJWT(), profileRouter, hanldeUnauthorized);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(staticPath));
  app.use("/", (req: express.Request, res: express.Response): void => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}

export default app;