import express from "express";
import config from "./config";

const app = express();

app.listen(config.port, () => {
  console.log(`Сервер был запущен по адресу http://localhost:${config.port}`);
});