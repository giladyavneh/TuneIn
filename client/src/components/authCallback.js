import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Auth from "../AuthApi";
import httpClient from "../services/httpClient";
import jwt from "jsonwebtoken";

function AuthCallback(){
    const location = useLocation()
    const {setUser, setLoggedIn} = useContext(Auth)
    const History = useHistory()
    useEffect(()=>{
        // (async ()=>{
            const auth_token = location.hash.slice(14).split('&')[0]
        //     const userData = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        //     {headers:{"Authorization": `Bearer ${auth_token}`}})
        //     .then(res=>res.json())
        //     .then(res=>res)
        //     .catch(err=>History.push("/login"))
            httpClient.get("/third_party_auth/google",{
                headers:{"Authorization": `Bearer ${auth_token}`}
            })
            .then(res=>{
                const comeback = res.data
                sessionStorage.setItem("access_token", comeback.access_token)
                sessionStorage.setItem("refresh_token", comeback.refresh_token)
                autoConnect(comeback.access_token)
                History.push('')
            })
        // })()
    },[])
    
    async function autoConnect(token){
        try{
          const res = jwt.decode(token)
          console.log('imlogged')
          setLoggedIn(true);
          setUser({id:res.id,email:res.email,username:res.username,is_admin:res.is_admin})
        }
        catch{
          setLoggedIn(false)
          setUser({})
        }
      }

    return(
        <div style={{ background: "rgb(60,60,60)", minHeight: "100vh"}}/>
    )
}

export default AuthCallback;