import session, {MemoryStore} from "express-session"

const SESSION_NAME = 'web_session';
const SESSION_SECRET = 'M8johDaJqAqm';
const MAX_AGE = 24 * 60 * 6 * 1000;

const store = new MemoryStore();
const obj = session({
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: MAX_AGE},
  store
})

export default obj;