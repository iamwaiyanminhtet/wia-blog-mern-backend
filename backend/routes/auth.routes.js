import express from "express";

import { signUp, signIn, googleLogin, signout } from "../controllers/auth.controllers.js";
import { signUpValidation, signInValidation } from "../utils/validationRules.js"

const router = express.Router();

router.post('/signup', signUpValidation, signUp);
router.post('/signin', signInValidation ,signIn);
router.post('/google-login', googleLogin);
router.post('/signout', signout);

export default router;