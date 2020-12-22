export default {
  host: "localhost",
  port: 8000,
  NODE_ENV: "development",
  mongodb: {
    // username: "as",
    // password: "mongodbpass",
    dbName: "admin",
    options: {
      host: "localhost",
      port: 27017,
    },
  },
  jwt: {
    secretOrKey: "jwt",
    maxAge: 60 * 60,
    salt: 10,
  },
};