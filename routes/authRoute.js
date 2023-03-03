import express from "express"
import {registerController,loginController, testController, forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"


//router object
const router=express.Router()

//routing
//Register || method post
router.post('/register',registerController)

//Login || POST
router.post('/login',loginController)

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

//Test routes
router.get("/test",requireSignIn,isAdmin ,testController)

//Protected User route
router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//Protected Admin Route
router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

export default router 