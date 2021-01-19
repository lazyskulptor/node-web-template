import express, {ErrorRequestHandler, RequestHandler} from "express";
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

const webErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Err404) {
    webNotFoundHandler(req, res, next);
  } else {
    res.status(500).send('Error');
  }
};

const apiErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Err404) {
    apiNotFoundHandler(req, res, next);
  } else {
    const result: ApiResult = {
      success: false,
      message: err.message
    };
    res.status(500).json(result);
  }
};


const webNotFoundHandler: RequestHandler = (req, res) => {
  res.status(404).send('Page Not Found');
};

const apiNotFoundHandler: RequestHandler = (req, res) => {
  const result: ApiResult = {
    success: false,
    message: 'Page Not Found'
  };
  res.status(404).json(result);
};
