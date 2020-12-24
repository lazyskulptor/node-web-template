import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local/"
import {RequestHandler} from "express";
import ApiResult from "../../model/api_result";

export const initedPp = passport.initialize();
export const ppSession = passport.session();

type InitCb = (username: string, password: string) => Promise<any>;
export default function initPassport(initCb: InitCb): void {
  passport.use(new LocalStrategy((username, password, done) => {
    initCb(username, password)
      .then(result => {
        if(result.isSuccess) {
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


export const isSignedIn: RequestHandler = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

export const isApiUser: RequestHandler = (req, res, next) => {
  if (req.session?.passport?.user) {
    next();
  } else {
    const result: ApiResult = {
      success: false,
      message: 'Not Authorized'
    };
    res.status(401).json(result);
  }
};

export const isSessionValid: RequestHandler = (req, res, next) => {
  if (req.session?.passport?.user) {
    next();
  } else {
    const result: ApiResult = {
      success: false,
      message: 'Not Authorized'
    };
    res.status(401).json(result);
  }
};
