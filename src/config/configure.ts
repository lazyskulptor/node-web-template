import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as I18n from "i18n";

export = (app : express.Application) : void => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  
  I18n.configure({
    locales: ['en', 'ko'],
    directory: path.join(__dirname, '../locales'),
    queryParameter: 'lang'
  });
  
  app.use(I18n.init);
  app.use(bodyParser.urlencoded({ extended: true }));
}
