/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose from "mongoose";
import express from "express";
import { createServer } from "http";
import config from "./config";
import initializeApp from "./core/app";
import createSocket from "./core/socket";

(async () => {
  try {
    const url = `mongodb://${config.mongodb.options.host}:${config.mongodb.options.port}/${config.mongodb.dbName}`;
    console.log("mongodb url: ", url);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    const app = express();
    const http = createServer(app);
    const io = createSocket(http);
    initializeApp(app, io);

    const server = http.listen(config.port, () => {
      console.log(`Сервер был запущен по адресу http://${config.host}:${config.port}`);
    });
    server.on("error", err => {
      console.log(err);
    });

    ["uncaughtException", "SIGINT", "SIGTERM"].forEach(sig => {
      process.on(sig, () => {
        io.close();
        server.close();
        process.exit();
      });
    });
  } catch (err) {
    console.log("Ошибка при подключении к mongodb", err);
    process.exit(1);
  }
})();