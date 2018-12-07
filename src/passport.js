const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  passReqToCallback: true,
};

passport.use(new Strategy(opts, async (req, jwtPayload, done) => {
  const User = req.app.get('models.user');
  const { id } = jwtPayload;
  let user;
  try {
    user = await User.query().findById(id);
  } catch (err) {
    return done(err, false);
  }
  if (user) {
    return done(null, user);
  }
  return done(null, false);
}));

passport.serializeUser((req, user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (req, id, done) => {
  const User = req.app.get('models.user');
  let user;
  try {
    user = await User.query().findById(id);
  } catch (err) {
    return done(err, null);
  }
  return done(null, user);
});

module.exports = passport;
