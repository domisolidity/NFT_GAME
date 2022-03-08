const passport = require('passport');
const localStrategy = require('./localStrategy');
const { User } = require('../../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.address);
  });
  passport.deserializeUser((address, done) => {
    User.findOne({
      where: { address },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  localStrategy();
};