import express from "express"
import { createProductController } from "../controllers/productController.js"
import {isAdmin,requireSignIn} from "../middlewares/authMiddleware.js"
import formidable from 'express-formidable'


const router=express.Router()

//Routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)