import config from "./config";
import app from "./app";
import mongoose from "mongoose";

(async () => {
  try {
    // const url = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@cluster0.diaud.mongodb.net/${config.mongodb.dbName}?retryWrites=true&w=majority`;
    const url = `mongodb://${config.mongodb.options.host}:${config.mongodb.options.port}/${config.mongodb.dbName}?gssapiServiceName=mongodb`;
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

    ["uncaughtException", "SIGINT", "SIGTERM"].forEach(x => {
      process.on(x, () => {
        server.close();
      });
    });
  } catch (err) {
    console.log("Ошибка при подключении к mongodb", err);
    process.exit(1);
  }
})();