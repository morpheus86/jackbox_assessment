import React from 'react'
import {Outlet} from "react-router-dom"
import MainNav from "../components/MainNav"

const RootLayout = () => {
  return (
    <div>
        <MainNav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
