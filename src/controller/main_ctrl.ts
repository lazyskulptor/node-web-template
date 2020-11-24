import express from "express";
const router = express.Router();

export default router;

router.get("/", (req: express.Request, res: express.Response): void => {
  res.render("index");
});

router.get("/rest", (req: express.Request, res: express.Response): void => {
  res.send("hello");
});


