/* eslint-disable */

import { NavLink, Link } from "react-router-dom"
import React from "react"

export default function Navbar() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }

  // const user = JSON.parse(localStorage.getItem("user"))

  const [renderBtn, setRenderBtn] = React.useState(false)

  function logout() {
    localStorage.removeItem("user")
    setRenderBtn(false)
  }

  return (
    <nav className="nav">
      <ul className="nav-list">
        <Link className="nav-link" to="/">
          #VANLIFE
        </Link>
        <div>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link"
            to={"host"}
          >
            Host
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link"
            to={"about"}
          >
            About
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link"
            to={"vans"}
          >
            Vans
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link"
            to={"register"}
          >
            Register
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link"
            to={"login"}
          >
            Login
          </NavLink>
          {/* {renderBtn && ( */}
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link logout-btn"
            to={"login"}
            onClick={() => {
              logout()
            }}
          >
            Logout
          </NavLink>
          {/* )} */}
        </div>
      </ul>
    </nav>
  )
}
