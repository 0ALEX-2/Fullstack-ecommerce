import express from "express"
import {loginController, registerController} from "../controllers/authController.js"

//Router object
const router=express.Router()

//Routing

//Register, POST method
router.post("/register",registerController)

//Login, post method
router.post("/login", loginController)

export default router 