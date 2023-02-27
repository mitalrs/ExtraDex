import { Router } from "express";
import passport from "passport";
import * as Usercontroller from '../controller/UserController.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }),
   Usercontroller.index 
);

export default router;