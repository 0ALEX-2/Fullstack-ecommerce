import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


//Registration coltroller
export const registerController=async(req,res)=>{
try {
    const {name,email,password,phone,address}=req.body
    //Validation
    if(!name){
        return res.send({error:"Name is required."})
    }
    if(!email){
        return res.send({error:"Email is required."})
    }
    if(!password){
        return res.send({error:"Password is required."})
    }
    if(!phone){
        return res.send({error:"Phone number is required."})
    }
    if(!address){
        return res.send({error:"Address is required."})
    }

    //Check user
    const existingUser=await userModel.findOne({email})
    //Check Existing user
    if(existingUser){
        return res.status(200).send({
            success:true,
            message:"Already registered, please login."
        })
    }

    //Register user
    const hashedPassowrd=await hashPassword(password)

    //Save user
    const user=await new userModel({name,email,phone,address,password:hashedPassowrd}).save()

    res.status(201).send({
        success:true,
        message:"User registered successfully.",
        user
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in Registration",
        error
    })
}
}

//Login Controller
export const loginController=async(req,res)=>{
try {
    const {email,password}=req.body 
    //Validation
    if(!email || !password){
       return res.status(404).send({
        success:false,
        message:"Invalid email or password"
       })
    }
    //Check user
    const user=await userModel.findOne({email})
       if(!user){
        return res.status(404).send({
            success:false,
            message:"Email is not registered"
        })
       }
   
    const match=await comparePassword(password,user.password)
    if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid Password"
        })
    }

   //Token
   const token=await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"}) 
   res.status(200).send({
    success:true,
    message:"Login successful",
    user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address
    },
    token, 
   })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in login",
        error 
    })
}
}

