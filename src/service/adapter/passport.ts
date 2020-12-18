import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local/"

type InitCb = (username: string, password: string) => Promise<any>;
export default function initPassport(initCb: InitCb): void {
  passport.use(new LocalStrategy((username, password, done) => {
    initCb(username, password)
      .then(result => {
        if(result.isSuccess) {
          done(null, true);
        } else {
          done(null, false, {message: result.message});
        }
      })
      .catch(err => done(err));
  }));
}
