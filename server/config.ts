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
    expiresIn: "60m",
    expiresInNum: 1000 * 60 * 60,
    timezoneDiffNum: 1000 * 60 * 60 * 3,
    salt: 10,
  },
};