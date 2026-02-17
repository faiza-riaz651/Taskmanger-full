import { Strategy as LocalStrategy } from "passport-local";
import { confirmPassword } from "../utils/password.js";
import { users } from "../models/userModel.js";
import passport from "passport";

const customField = {
  usernameField: "email",
};
const verify = async (email, password, done) => {
  const user = await users.findOne({ email: email });
  if (!user) {
    return done(null, false, { message: "User Not Found!" });
  }
  const matched = await confirmPassword(password, user.password);
  if (!matched) {
    return done(null, false, { message: "Wrong Password" });
  }
  console.log(user);
  return done(null, user);
};

const strategy = new LocalStrategy(customField, verify);

passport.use(strategy);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phoneNo: user.phoneNo,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
