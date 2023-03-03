import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export const PrivetRoute=()=>{
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
           const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        //    {
        //     headers:{
        //         "Authorization":auth?.token
        //     }
        //  }
           )
           if(res.data.ok){
            setOk(true)
           }else{
            setOk(false)
           }
        }
        if(auth?.token)authCheck()
    },[auth?.token])

    return ok ? <Outlet/> : <Spinner/>
}