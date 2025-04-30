import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prismaDb from "./app";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "",
  // issuer: "accounts.examplesoft.com", // domenas env
  // audience: "yoursite.net", // domenas irgi env
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await prismaDb.user.findFirst({
        where: { id: jwt_payload.userid },
        omit: { password: true },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false); // todo: Pasalinti error isvedima
    }
  })
);

export default passport;
