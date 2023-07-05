import React, { useState, useRef } from "react";
import {useNavigate, json} from "react-router-dom"
import classes from "./form.module.css";
const Form = () => {
  const { container, form_wrap, form_group } = classes;
  const [toggleSignUp, setToggleSignUp] = useState(true);
  const navigate = useNavigate()
  const toggleSignUpHandler = () => {
    setToggleSignUp(!toggleSignUp);
  };
  const firstNameInput = useRef("")
  const lastNameInput = useRef("")
  const passwordInput = useRef("")
  const passwordInput2 = useRef("")
  const emailInput = useRef("")

  const onSubmitHandler = async (event)=> {
    event.preventDefault();
    let user;
    let req;
    if(toggleSignUp){
      const firstNameVal = firstNameInput.current.value.trim()
      const lastNameVal = lastNameInput.current.value.trim()
      const passwordVal = passwordInput.current.value.trim()
      const passwordVal2 = passwordInput2.current.value.trim()
      const emailVal = emailInput.current.value.trim()
      if(passwordVal !== passwordVal2){
        alert("Password does not match")
        return;
      }
      user = {
        firstName: firstNameVal,
        lastName: lastNameVal,
        password: passwordVal,
        email: emailVal,
        isAdmin: false
      }
      req = "signup"
    } else {
      const passwordVal = passwordInput.current.value.trim()
      const emailVal = emailInput.current.value.trim()
      user = {
        email: emailVal,
        password: passwordVal
      }
      req = "login"
    }

    const response = await fetch(`http://localhost:8080/${req}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
    if(response.status === 422 || response.status === 401){
      return response
    }
    if(!response.ok){
      throw json({message: "Could not authenticate user."}, {status: 500})
    }
    const res = await response.json()
    const token = res.token
    localStorage.setItem("token", token)
    let userId
    if(toggleSignUp){
      userId = res.user.id
    } else {
      userId = res.userId
    }
    if(res.isAdmin){
      navigate(`/admin/`)
      window.location.reload()
    } else {
      navigate(`/${userId}`)
      window.location.reload()
    }
  }
  let formContent;
  if (toggleSignUp) {
    formContent = (
      <>
        <div className={form_group}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" ref={firstNameInput}/>
        </div>
        <div className={form_group}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" ref={lastNameInput}/>
        </div>
        <div className={form_group}>
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailInput}/>
        </div>
        <div className={form_group}>
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordInput}/>
        </div>
        <div className={form_group}>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" ref={passwordInput2}/>
        </div>
        <button type="submit" className="btn">
          {toggleSignUp ? "Sign Up" : "Login"}
        </button>
      </>
    );
  } else {
    formContent = (
      <>
        <div className={form_group}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailInput}/>
        </div>
        <div className={form_group}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={passwordInput}/>
        </div>
        <button type="submit" className="btn">
          {toggleSignUp ? "Sign Up" : "Login"}
        </button>
      </>
    );
  }
  return (
    <div id={container}>
      <div className={form_wrap}>
        <h1>{toggleSignUp ? "Sign Up" : "Login"}</h1>
        {toggleSignUp ? <p>It's free and only takes a minute</p> : ""}
        {

        }
        <form onSubmit={onSubmitHandler}>{formContent}</form>
      </div>
      <footer>
        <p>
          Already have an account?{" "}
          <span onClick={toggleSignUpHandler}>Login Here</span>
        </p>
      </footer>
    </div>
  );
};

export default Form;
