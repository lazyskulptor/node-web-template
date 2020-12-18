import dotenv from "dotenv";
import express from "express";
import secure from "./config/secure";
import configure from "./config/configure";
import route from "./controller";
import handleErr from "./config/handle_err";
import mountApi from "./sub_app/init_api";

dotenv.config();

const port = process.env.SERVER_PORT; // default port to listen
const app: express.Application = express();

mountApi(app);


secure(app);
configure(app);
route(app);
handleErr(app);

// start the Express server
app.listen(port, (): void => {
  console.info(`server started at http://localhost:${port}`);
});