import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as I18n from "i18n";
import ConfigurationOptions = i18n.ConfigurationOptions;
const MAX_AGE = 24 * 60 * 6 * 1000;

export = (app : express.Application) : void => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");

  app.use(configureI18n());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(wrapper);
}

type I18nInit = (req: Express.Request, res: Express.Response, next?: () => void) => void;
const configureI18n = (): I18nInit => {
  const opt: ConfigurationOptions = {
    locales: ['en', 'ko'],
    directory: path.join(__dirname, '../locales'),
    queryParameter: 'lang',
    cookie: 'web_locale'
  };

  if (process.env.NODE_ENV !== 'production') {
    opt.autoReload = true;
  }

  I18n.configure(opt);
  return I18n.init;
}

const wrapper = (req: express.Request, res: express.Response, next: () => void): void => {
  res.locals.url = req.originalUrl;
  if (req.query.lang) {
    res.cookie('web_locale', req.query.lang, {maxAge: MAX_AGE, httpOnly: true});
  }
  next();
}
