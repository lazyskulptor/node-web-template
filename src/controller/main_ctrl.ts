import express, {RequestHandler} from "express";
import passport from "passport";
const router = express.Router();

export default router;

// routers for GET METHOD
router.get('/', (req: express.Request, res: express.Response): void => {
  res.render("index");
});

router.get('/rest', (req: express.Request, res: express.Response): void => {
  res.send("hello");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail',
    failureFlash: true
  }));
