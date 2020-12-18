import express from "express";
import bodyParser from "body-parser";
import apiRoute from "../controller/rest";
import secure, {SecType} from "../config/secure";
import handleErr, {HandlerType} from "../config/handle_err";
import {IncomingHttpHeaders} from "http";

const api: express.Application = express();

export default function(app: express.Application) {
  const isApiOn = process.env.IS_API_ON === 'TRUE';
  if (!isApiOn)
    return;


  api.use(bodyParser.json());
  api.use(wrapper);
  apiRoute(api);
  secure(app, SecType.API);
  app.use('/rest/v0', api);
  handleErr(api, HandlerType.API);
}

const wrapper = (req: express.Request, res: express.Response, next: ()=>void) => {
  if (!validateAccept(req.headers)) {
    res.status(406).json({result: 'not acceptable request'});
  } else {
    next();
  }
};

const validateAccept = (headersRaw: IncomingHttpHeaders): boolean => {
  const acceptableHeader = ['application/json', '*/*'];
  let result = false;
  acceptableHeader.forEach(value => {
    if (headersRaw.accept && headersRaw.accept.indexOf(value) > -1) {
      result = true;
    }
  });
  return result;
}
