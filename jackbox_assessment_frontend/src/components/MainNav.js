import React, {useState} from 'react'
import {NavLink, redirect} from "react-router-dom"
import classes from "./MainNav.module.css"
const MainNav = () => {
  const {right_side, status, active} = classes
  const tokenStored = localStorage.getItem("token")
  const [token, setToken] = useState(tokenStored)

  const logoutHandler = ()=> {
    setToken("")
    localStorage.removeItem("token")
    redirect("/")
  }

  let navBarContent;
  if(token){
    navBarContent = <nav>
      <NavLink to="/" className={({isActive})=> isActive ? active : undefined}>
      <div>Home</div>
      </NavLink>
      <div className={right_side}>
        <div className={status}>UserName</div>
      {
        token && (
        <NavLink to="/" className={({isActive})=> isActive ? active : undefined} onClick={logoutHandler}>
        <div> Logout</div>
        </NavLink>
        )
      }
      </div>
    </nav>
  } else {
   navBarContent = <nav>
      <NavLink to="/" className={({isActive})=> isActive ? active : undefined}>
      <div>Home</div>
      </NavLink>
      <div className={right_side}>
        <div className={status}>UserName</div>
      <NavLink to="/login" className={({isActive})=> isActive ? active : undefined}>
        <div> Sign Up </div>
      </NavLink>
      </div>
    </nav>
  }
  return (
    <>
    {navBarContent}
    </>
  )
}

export default MainNav
