import express from "express";
import authRouter from "./modules/auth/routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use("/api/auth", authRouter);

export default app;