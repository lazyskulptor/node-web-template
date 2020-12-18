import express, {RequestHandler} from "express";
import passport from "passport";
const router = express.Router();

export default router;

// routers for GET METHOD
router.get('/', (req: express.Request, res: express.Response): void => {
  console.log(res);
  res.render("index");
});

router.get('rest', (req: express.Request, res: express.Response): void => {
  res.send("hello");
});


// routers for POST METHOD
router.post('login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login',
  failureFlash: true
}));
