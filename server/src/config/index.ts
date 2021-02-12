export default {
  // process.env. присваивание потом вынести перед запуском проекта
  host: process.env.host || "localhost",
  port: process.env.port || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  mongodb: {
    username: process.env.mongodb_username || "",
    password: process.env.mongodb_password || "",
    dbName: process.env.mongodb_dbName || "admin",
    options: {
      host: process.env.mongodb_options_host || "localhost",
      port: process.env.mongodb_options_port || 27017,
    },
  },
  jwt: {
    secretOrKey: "jwt",
    maxAge: 60 * 60,
    salt: 10,
  },
};