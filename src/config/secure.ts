import helmet from 'helmet';
import express from "express";
import cors from 'cors';

const corsHostName = process.env.HOST_NAME;

export enum SecType {
  WEB, API
}

export default function(app : express.Application, secType?: SecType): void {
  if (secType === SecType.API) {
    app.use(cors({
      // origin : corsHostName,
      origin : false,
      methods: ['GET', 'POST'],
      credentials: true
    }));
    app.use(helmet());
  } else {
    // app.use(cors({
    //   origin : 'http://127.0.0.1:8080',
    //   credentials: true
    // }));
    app.use(helmet({
      contentSecurityPolicy: false
    }));
  }
}