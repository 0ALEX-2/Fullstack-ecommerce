import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = () => {
    const [count,setCount]=useState(5)
    const navigate=useNavigate()
    const locatoin=useLocation()

    useEffect(()=>{
      const interval=setInterval(()=>{
        setCount((prev)=>--prev)
      },1000);
      count === 0 && navigate("/login",{
        state:locatoin.pathname
      })

      return ()=>clearInterval(interval)
    },[count,navigate,locatoin])
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-3"
      style={{height:"100vh"}}
      >
        <h1>Redirecting you in {count} seconds.</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
