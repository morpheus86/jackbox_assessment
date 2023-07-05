import React, {useEffect, useState} from 'react'
import {json} from "react-router-dom"
import classes from "./UserPage.module.css"
const UserPage = () => {
  const [user, setUser] = useState()
  const [error, setError] = useState(false)
  const {list} = classes
  useEffect(() => {
    const getUserInfo = async ()=> {
      try {
        const path = window.location.pathname
        const userId = path.slice(1)
        const response = await fetch("http://localhost:8080/"+ userId)
        if(!response.ok){
          json({message: "something is wrong"}, {status: 404})
          return
        }
        const info = await response.json()
        setUser(info.user)
      } catch (error) {
        setError(true)
      }
    }
    getUserInfo()
  }, [])
  return (
    <div>
      { error && user &&
      <ul className={list}>
        <li>{user.firstName}</li>
        <li>{user.lastName}</li>
        <li>{user.email}</li>
      </ul>

      }
    </div>
  )
}

export default UserPage
