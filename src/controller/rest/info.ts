import express from "express";
const router = express.Router();

export default router;

router.get("/", (req: express.Request, res: express.Response): void => {
  const result = {
    success: true
  };
  res.json(result);
});
