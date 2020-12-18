import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "../config";
import passport from "passport";
import User from "../modules/auth/models/User";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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