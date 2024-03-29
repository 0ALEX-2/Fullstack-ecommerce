import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyles.css";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/auth';



const initialData={
    email:"",
    password:""
}
const Login = () => {
  const [user,setUser]=useState(initialData)
  const navigate=useNavigate()
  const location=useLocation()
  const [auth,setAuth]=useAuth()

    const handleChange=(e)=>{
      const {value,name}=e.target
      setUser((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit=async(e)=>{
    e.preventDefault()
   try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
    if(res && res.data.success){
      toast.success(res.data && res.data.message)
      setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token,
      })
      localStorage.setItem('auth',JSON.stringify(res.data))
      navigate(location.state||"/")
    }else{
      toast.error(res.data.message)
    }
   } catch (error) {
    console.log(error);
    toast.error("Something went wrong while logging in.")
   }
    }
    const {email,password}=user
  return (
    <Layout title={"Login-HutBajar"} style={{minHeight:"90vh"}}>
         <div className="form-container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
        
          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

         <div >
          <button type="submit" className="btn btn-primary">
            Login
          </button>
         </div>
         <div className='mt-3'>
          <button className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>
            Forgote Password
          </button>
        </div> 
        </form>
      </div>
    </Layout>
  )
}

export default Login