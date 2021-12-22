import passport from 'passport';
import '../config/global';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('token'),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ['RS256']
};

const User = db.User;

const strategy = new JwtStrategy(options, async (payload, done) => {
  console.log('passport: ' + payload);
  try {
    const user = await User.findOne({
      where: {
        id: payload.userId
      }
    });
    const loggedInUser = user?.dataValues;
    if (user) {
      return done(null, loggedInUser);
    }
    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});

passport.use(strategy);

export const requireAuth = passport.authenticate('jwt', { session: false });
