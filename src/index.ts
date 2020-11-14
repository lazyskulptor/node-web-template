import dotenv from "dotenv";
import express from "express";
import secure from "./config/secure";
import configure from "./config/configure";
import route from "./controller";

dotenv.config();

const port = process.env.SERVER_PORT; // default port to listen
const app: express.Application = express();

secure(app);
configure(app);
route(app);

// start the Express server
app.listen(port, (): void => {
  console.info(`server started at http://localhost:${port}`);
});