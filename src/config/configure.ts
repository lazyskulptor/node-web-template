import express from "express";
import path from "path";
import bodyParser from "body-parser";

export = (app : express.Application) : void => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");

  app.use(bodyParser.urlencoded({ extended: true }));
}
