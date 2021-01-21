import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./log.css";
import TopBanner from "./TopBanner";
import {googleAuth} from "../services/googleAuth";


function LoginPage({autoConnect}) {
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const [passwordMassage, setPasswordMassage] = useState();
  const [nameMassage, setNameMassage] = useState();
  const [rememberMe, setRememberMe] = useState();
  const History=useHistory()
  const Location = useLocation()
  
  async function login() {
    if (!Boolean(username) || !Boolean(password)) {
      setNameMassage(
        !Boolean(username) ? "Please enter a valid user name" : ""
      );
      setPasswordMassage(
        !Boolean(password) ? "Please enter a valid password" : ""
      );
      return;
    }
    let content = { username, password };
    let options = {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let status;
    let comecabk;
    await fetch("/login", options)
      .then((res) => {
        console.log(res)
        status = res.status;
        return res.json();
      })
      .then((res) => (comecabk = res));
      console.log(comecabk)
      if (status>=400){
          setNameMassage(comecabk.massage)
      }
      else{
          if(rememberMe){
            localStorage.setItem("access_token", comecabk.access_token)
            localStorage.setItem("refresh_token", comecabk.refresh_token)
          }
          sessionStorage.setItem("access_token", comecabk.access_token)
          sessionStorage.setItem("refresh_token", comecabk.refresh_token)
          autoConnect(comecabk.access_token)
          History.push('/')
      }
  }
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
  return (
    <div className="background">
      <TopBanner />
      <div className="content">
        <div className="titles">
          <h1>WELCOME BACK!</h1>
          <h3>Fill up the fields and let's keep on Rocking!</h3>
          Don't have an account yet? <a href="/signup">signup</a> and join the
          party!.
        </div>
        <div className="card">
          <div className="signUp">
            <h3>User Name</h3>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
                setNameMassage("");
              }}
            />
            <div className="alert">{nameMassage}</div>
            <h3>Password</h3>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMassage("");
              }}
            />
            <div className="alert">{passwordMassage}</div>
          </div>
          <div className="loginSubmit">
            <button className="createUser" onClick={login}>
              <img src="https://www.flaticon.com/svg/static/icons/svg/876/876817.svg" />
              <span>Start Playing!</span>
            </button>
            <div className="remember">
              <input
                type="checkbox"
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember me
            </div>
          </div>
          <button className="google-connect" onClick={googleAuth}>
            Connect with <img src="https://www.flaticon.com/svg/vstatic/svg/299/299409.svg?token=exp=1611223517~hmac=903e6b8d969c8ed803c888ae3848dbad"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
