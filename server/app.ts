import express from "express";
import authRouter from "./modules/auth/routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

export default app;