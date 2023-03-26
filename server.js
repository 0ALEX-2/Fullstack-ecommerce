import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"


//configure env
dotenv.config()

//Database config
connectDB()

//rest object
const app=express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use("/api/v1/auth",authRoutes)
//rest api
app.get("/",(req,res)=>{
    res.send({
        message:"Welcome to HutBajar."
    })
})


//port
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log("Server is running on port 8080".bgCyan.white);
})