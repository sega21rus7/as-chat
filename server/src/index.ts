import config from "./config";
import app from "./app";
import mongoose from "mongoose";

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
    const server = app.listen(config.port, () => {
      console.log(`Сервер был запущен по адресу http://${config.host}:${config.port}`);
    });
    server.on("error", err => {
      console.log(err);
    });

    ["uncaughtException", "SIGINT", "SIGTERM"].forEach(sig => {
      process.on(sig, () => {
        server.close();
        process.exit();
      });
    });
  } catch (err) {
    console.log("Ошибка при подключении к mongodb", err);
    process.exit(1);
  }
})();