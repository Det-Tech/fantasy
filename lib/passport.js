import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// passport#160
passport.deserializeUser((req, id, done) => {
  req.db
    .collection('users')
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, done) => {
      console.log("12")
      const user = await req.db.collection('users').findOne({ email });
      if (user) done(null, user);
      else done(null, false)
    },
  ),
);

export default passport;