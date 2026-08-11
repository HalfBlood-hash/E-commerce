
import { Router } from "express";

const router=Router();
import {registerUser,login} from "../controllers/user.controllers.js"
router.route("/register").post(registerUser)
router.route('/login').post(login)

export default router