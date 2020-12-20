import { Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import express from "express";
import Cookies from "universal-cookie";
import config from "../config";
import User from "../modules/auth/models/User";

const extractCookie = (req: express.Request): string => {
  const cookies = new Cookies(req.headers.cookie);
  console.log("cookies", cookies);
  return cookies.get("jwt");
};

const options = {
  jwtFromRequest: extractCookie,
  secretOrKey: config.jwt.secretOrKey,
};

export default function (pass: typeof passport): void {
  pass.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload._id).select("_id email login");
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log("err", err);
        return done(err, false);
      }
    })
  );
}