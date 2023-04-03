import express from "express"
import {forgotPasswordController, loginController, registerController} from "../controllers/authController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js"


//Router object
const router=express.Router()

//Routing

//Register, POST method
router.post("/register",registerController)

//Login, post method
router.post("/login", loginController)

//Protected route authentication
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//Forgot password
router.post("/forgot-password",forgotPasswordController)

export default router 