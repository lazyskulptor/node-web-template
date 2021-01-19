import dotenv from "dotenv";
import app from "./apps/main_app";

dotenv.config();

const port = process.env.SERVER_PORT; // default port to listen

// start the Express server
app.listen(port, (): void => {
  console.info(`server started at http://localhost:${port}`);
});
