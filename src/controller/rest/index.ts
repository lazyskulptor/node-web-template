import express from "express";
import restInfo from "./info";

export default function route(app : express.Application) : void {
  app.use('/info', restInfo);
}