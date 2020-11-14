import coolkieParser from "cookie-parser";
import session from 'express-session';
import helmet from 'helmet';
import express from "express";
import cors from 'cors';

const SESSION_NAME = 'web_session';
const SESSION_SECRET = 'M8johDaJqAqm';
const MAX_AGE = 24 * 60 * 6 * 1000;

export = (app : express.Application) : void => {
  app.use(cors({
    origin : "http://127.0.0.1:8080",
    credentials: true
  }));
  app.use(helmet());
  app.use(coolkieParser());
  app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: MAX_AGE}
  }));
}