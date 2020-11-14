import express from "express";
import mainRouter from "./main_ctrl";

export default function route(app : express.Application) : void {
  app.use('/', mainRouter);
}