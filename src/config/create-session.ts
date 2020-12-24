import session, {MemoryStore} from "express-session"
import {RequestHandler} from "express";

const SESSION_NAME = 'web_session';
const SESSION_SECRET = 'M8johDaJqAqm';
const MAX_AGE = 24 * 60 * 6 * 1000;

const store = new MemoryStore();
const sessionWrapper = session({
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: MAX_AGE},
  store,
});

const webSession = sessionWrapper;

export const apiSession: RequestHandler = (req, res, next) => {
  if(req.headers.cookie && req.headers.cookie.indexOf(SESSION_NAME) > -1) {
    webSession(req, res, next);
  } else {
    next();
  }
};


export default webSession;