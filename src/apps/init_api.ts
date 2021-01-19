import express, {RequestHandler} from "express";
import bodyParser from "body-parser";
import apiRoute from "../controller/rest";
import secure, {SecType} from "../config/secure";
import handleErr, {HandlerType} from "../config/handle_err";
import {IncomingHttpHeaders} from "http";
import {apiSession} from "../config/create-session";
import {initedPp, ppSession} from "../service/adapter/passport";

const api: express.Application = express();

export default function(app: express.Application) {
  const isApiOn = process.env.IS_API_ON === 'TRUE';
  if (!isApiOn)
    return;


  api.use(bodyParser.json());
  api.use(wrapper);
  api.use(apiSession);
  app.use(initedPp);
  app.use(ppSession);

  apiRoute(api);
  secure(app, SecType.API);
  app.use('/rest/v0', api);
  handleErr(api, HandlerType.API);
}

const wrapper: RequestHandler = (req, res, next) => {
  if (!validateAccept(req.headers)) {
    res.status(406).json({result: 'not acceptable request'});
  } else {
    next();
  }
};

const validateAccept = (headers: IncomingHttpHeaders): boolean => {
  const acceptableHeader = ['application/json', '*/*'];
  let result = false;
  acceptableHeader.forEach(value => {
    if (headers.accept && headers.accept.indexOf(value) > -1) {
      result = true;
    }
  });
  return result;
}
