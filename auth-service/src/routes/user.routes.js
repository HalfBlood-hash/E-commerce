
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router=Router();
import {registerUser,login,getCurrentUser,logout} from "../controllers/user.controllers.js"

console.log("satyam routes")
router.route("/register").post(registerUser)
router.route('/login').post(login)


router.route("/me")
    .get(verifyJWT, getCurrentUser);

router.route("/logout")
    .post(verifyJWT, logout);

export default router
