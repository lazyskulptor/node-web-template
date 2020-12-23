import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local/"

type InitCb = (username: string, password: string) => Promise<any>;
export default function initPassport(initCb: InitCb): void {
  passport.use(new LocalStrategy((username, password, done) => {
    initCb(username, password)
      .then(result => {
        if(result.isSuccess) {
          console.log(result.user.username);
          done(null, result.user.username);
        } else {
          done(null, false, {message: result.message});
        }
      })
      .catch(err => {
        console.error(err);
        done(err);
      });
  }));
}


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// passport.deserializeUser(function (user, done) {
//   //If using Mongoose with MongoDB; if other you will need JS specific to that schema.
//   User.findById(user.id, function (err, user) {
//     done(err, user);
//   });
// });
