import express from "express";
import {isApiUser} from "../../service/adapter/passport";
const router = express.Router();

export default router;

router.get("/", isApiUser, (req, res): void => {
  const result = {
    success: true
  };
  res.json(result);
});
