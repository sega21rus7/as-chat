import express from "express";
import bodyParser from "body-parser";
import path from "path";
import authRouter from "modules/auth/routes";
import profileRouter from "modules/profile/routes";
import authMiddleware from "middlewares/auth";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require("cors")());

app.use("/api/auth", authRouter);
app.use("/api/profile", authMiddleware, profileRouter);

if (process.env.NODE_ENV === "production") {
  const clientFilesPath = path.resolve(process.cwd(), "client_build");
  console.log("clientFilesPath", clientFilesPath);
  app.use(express.static(clientFilesPath));
  app.use("/static/", express.static(path.resolve(process.cwd(), "src", "static")));
  app.use("*", (req: express.Request, res: express.Response): void => {
    res.sendFile(path.resolve(clientFilesPath, "index.html"));
  });
}

export default app;