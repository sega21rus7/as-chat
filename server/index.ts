import config from "./config";
import app from "./app";
import mongoose from "mongoose";

(async () => {
  try {
    const url = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@cluster0.diaud.mongodb.net/${config.mongodb.dbName}?retryWrites=true&w=majority`;
    console.log("mongodb url: ", url);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const server = app.listen(config.port, () => {
      console.log(`Сервер был запущен по адресу http://${config.host}:${config.port}`);
    });

    process.on("SIGTERM", () => {
      server.close();
    });
  } catch (err) {
    console.log("Ошибка при подключении к mongodb", err);
    process.exit(1);
  }
})();

