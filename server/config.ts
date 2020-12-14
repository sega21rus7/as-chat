export default {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  mongodb: {
    username: "as",
    password: "mongodbpass",
    dbName: "admin",
  },
  jwt: "dev-jwt",
};