const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require("./models/UserModel");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com"; // domenas env
// opts.audience = "yoursite.net"; // domenas irgi env

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await UserModel.getById(jwt_payload.userid, ["id", "email", "role", "status"]);
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

passport.isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {   
    if (user) {
      req.user = user;
      return next();
    }
    return res
      .status(401)
      .json({ error: { status: 401, message: "Unauthorized" } });
  })(req, res, next);
};

passport.isAdmin = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (user && user.role === 2) {
      req.user = user;
      return next();
    }
    return res
      .status(401)
      .json({ error: { status: 401, message: "Unauthorized" } });
  })(req, res, next);
};

module.exports = passport;
