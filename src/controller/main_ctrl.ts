import express, {RequestHandler} from "express";
import passport from "passport";
import {isSignedIn} from "../service/adapter/passport";
const router = express.Router();

export default router;

// routers for GET METHOD
router.get('/', (req, res) => {
  res.render("index");
});

router.get('/rest', isSignedIn, (req, res) => {
  res.send("hello");
});

router.get('/login', (req, res) => {
  res.send("Login Page");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail',
    failureFlash: true
  }));
