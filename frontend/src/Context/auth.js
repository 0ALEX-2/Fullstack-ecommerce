import { useState,useEffect,useContext,createContext } from "react";


const AuthContext=createContext()


export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })

    useEffect(()=>{
      const data=localStorage.getItem("auth")
      if(data){
        const parseData=JSON.parse(data)
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token
        })
      }
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)