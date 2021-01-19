import dotenv from "dotenv";
import express from "express";
import secure from "../config/secure";
import configure from "../config/configure";
import route from "../controller";
import handleErr from "../config/handle_err";
import mountApi from "../apps/init_api";

dotenv.config();

const app: express.Application = express();

mountApi(app);

secure(app);
configure(app);
route(app);
handleErr(app);

export default app;
