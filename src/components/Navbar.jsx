import { NavLink, Link } from "react-router-dom"
import React from "react"

export default function Navbar() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }

  function logout() {
    localStorage.removeItem("user")
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
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav-link"
            to={"login"}
          >
            <button onClick={logout}>X</button>
          </NavLink>
        </div>
      </ul>
    </nav>
  )
}
