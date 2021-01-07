import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./log.css";
import TopBanner from "./TopBanner";

function LoginPage({autoConnect}) {
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const [passwordMassage, setPasswordMassage] = useState();
  const [nameMassage, setNameMassage] = useState();
  const [rememberMe, setRememberMe] = useState();
  const History=useHistory()

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
        status = res.status;
        return res.json();
      })
      .then((res) => (comecabk = res));
      if (status>=400){
          setNameMassage(comecabk.massage)
      }
      else{
        for (let key in comecabk){
            if(rememberMe)localStorage.setItem(key, comecabk[key])
            sessionStorage.setItem(key, comecabk[key])
        }
        autoConnect(comecabk.idKey,comecabk.username)
        History.push('/')
        
      }
  }

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
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
