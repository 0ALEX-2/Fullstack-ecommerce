import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios"
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css"
import { useAuth } from "../../context/auth";



const initialData={
   
    email:"",
    password:"",
   
}
const Login = () => {
    const [data,setData]=useState(initialData)
    const navigate=useNavigate()
    const [auth,setAuth]=useAuth()
    const location=useLocation()
  
    const handleChange=(e)=>{
      let {name,value}=e.target 
      setData((prev)=>({...prev,[name]:value}))
    }
  
    const handleSubmit=async (e)=>{
       e.preventDefault()
  
       try {
          const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,data)
  
          if(res && res.data.success){
              toast.success(res.data && res.data.message );
             setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
             })
             localStorage.setItem('auth',JSON.stringify(res.data))
             navigate(location.state || "/")
          }else{
              toast.error(res.data.message )
          }
       } catch (error) {
          console.log(error)
          toast.error('Something went wrong!')
       }
  
  
  
       setData({
       
          email:"",
          password:"",
         
       })
    }
  
    const {email,password}=data
  return (
    <Layout title={"Register - Ecommerce app"}>
      <div  className="form-container" style={{ minHeight: "90vh" }}>
        <h1 className="title">Login Form</h1>

        <form onSubmit={handleSubmit}>
         
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

         <div className="mb-3">
         <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>
            Forgot Password
          </button>

         </div>
          
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login