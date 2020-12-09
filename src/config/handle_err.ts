import express from "express";
import Err404 from "../model/error/Err404";

export default function handleErr(app: express.Application): void  {
  app.use(errHandler);
  app.use(notFoundHandler)
}

type erroHandelrFn = (err:Error, req: express.Request, res:express.Response, next: ()=>void) => void;
const errHandler: erroHandelrFn = (err, req, res, next) => {
  if (err instanceof Err404) {
    notFoundHandler(req, res);
  } else {
    res.status(500).send('Error');
  }
};

type noPageHandelrFn = (req: express.Request, res:express.Response) => void;
const notFoundHandler: noPageHandelrFn = (req, res) => {
  res.status(404).send('Page Not Found');
};
