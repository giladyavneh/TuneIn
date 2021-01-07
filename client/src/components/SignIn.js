import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {mailCheck, passwordCheck, usernameCheck} from "../services/auth"
import "./log.css";
import TopBanner from "./TopBanner";

function SignIn({autoConnect}) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstPassword, setFirstPassword] = useState();
  const [passwordMassage, setPasswordMassage] = useState();
  const [nameMassage, setNameMassage] = useState();
  const [emailMassage, setEmailMassage] = useState();
  const [rememberMe, setRememberMe] = useState();
  const History=useHistory()

  function comparePasswords(compration) {
    setPasswordMassage(
      compration === firstPassword ? "" : "Passwords do not match"
    );
    if (compration === firstPassword) setPassword(compration);
  }

  async function submit() {
    if (!Boolean(username) ||
    !usernameCheck(username) ||
    !Boolean(email) ||
    !mailCheck(email) ||
    !Boolean(password) ||
    !passwordCheck(password)) {
      setNameMassage(!Boolean(username) || !usernameCheck(username) ?"Please enter a valid user name":"");
      setEmailMassage(!Boolean(email) || !mailCheck(email)?"Please enter a valid E-mail adress":"")
      setPasswordMassage(!Boolean(password)?"Please enter a valid password and confirm it":
      !passwordCheck(password) ? "password must be at list 6 characters long":"")
      return;
    }
    let content = { username, email, password };
    let options = {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let status;
    let comecabk;
    await fetch("/signin", options)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((res) => (comecabk = res));
    if (status >= 400) {
      let usernameRegex = /users.username/;
      let emailRegex = /users.email/;
      if (comecabk.error.errors.some(err=>usernameRegex.test(err.message))) {
        setNameMassage("This user Name is already taken :(");
      } else if (comecabk.error.errors.some(err=>emailRegex.test(err.message))) {
        setEmailMassage("This mail is already being used :(");
      } else
        setNameMassage(
          `It seems like we have a problem with our ${status==500?"server":"connection"}...`
        );
    }
    else{
        for (let key in comecabk){
            if(rememberMe)localStorage.setItem(key, comecabk[key])
            sessionStorage.setItem(key, comecabk[key])
        }
    await autoConnect(comecabk.idKey,comecabk.username)
    History.push('/')
    }
  }

  return (
    <div className="background">
      <TopBanner />
      <div className="content">
        <div className="titles">
          <h1>WELCOME TO TUNE IN!</h1>
          <h3>Fill up the fields bellow and let's start playing!</h3>
          Or just <a href="/login">log in</a> if you already have an account.
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
            <h3>E-mail:</h3>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailMassage("");
              }}
            />
            <div className="alert">{emailMassage}</div>
            <h3>Password</h3>
            <input
              type="password"
              onChange={(e) => {
                setFirstPassword(e.target.value);
                setPasswordMassage("");
              }}
            />
            <h3>Confirm Password</h3>
            <input
              type="password"
              onChange={(e) => comparePasswords(e.target.value)}
            />
            <div className="alert">{passwordMassage}</div>
          </div>
          <div className="submition">
            <div className="remember">
              <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} /> Remember
              me
            </div>
            <button className="createUser" onClick={submit}>
              <img src="https://www.flaticon.com/svg/static/icons/svg/876/876817.svg" />
              <span>Start Playing!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
