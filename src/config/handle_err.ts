import express from "express";
import Err404 from "../model/error/Err404";
import ApiResult from "../model/api_result";

export enum HandlerType {
  WEB, API
}
export default function handleErr(app: express.Application, handlerType?: HandlerType): void  {
  if (handlerType === HandlerType.API) {
    app.use(apiErrHandler);
    app.use(apiNotFoundHandler)
  } else {
    app.use(webErrHandler);
    app.use(webNotFoundHandler)
  }
}

type erroHandelrFn = (err:Error, req: express.Request, res:express.Response, next: ()=>void) => void;
const webErrHandler: erroHandelrFn = (err, req, res, next) => {
  if (err instanceof Err404) {
    webNotFoundHandler(req, res);
  } else {
    res.status(500).send('Error');
  }
};

const apiErrHandler: erroHandelrFn = (err, req, res, next) => {
  if (err instanceof Err404) {
    apiNotFoundHandler(req, res);
  } else {
    const result: ApiResult = {
      success: false,
      message: err.message
    };
    res.status(500).json(result);
  }
};


type noPageHandelrFn = (req: express.Request, res:express.Response) => void;
const webNotFoundHandler: noPageHandelrFn = (req, res) => {
  res.status(404).send('Page Not Found');
};

const apiNotFoundHandler: noPageHandelrFn = (req, res) => {
  const result: ApiResult = {
    success: false,
    message: 'Page Not Found'
  };
  res.status(404).json(result);
};
