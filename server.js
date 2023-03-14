import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"



//configure env
dotenv.config()
//rest object
const app=express()

//database config 
connectDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)

//rest api
app.get("/",(req,res)=>{
    res.send(
        "<h1>Welcome to ecommerce app</h1>"
    )
}) 

//port
const PORT=process.env.PORT || 8080 

//run listen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})