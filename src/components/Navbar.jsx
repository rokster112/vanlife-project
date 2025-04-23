/* eslint-disable */

import { NavLink, Link, useLocation } from "react-router-dom"
import React from "react"

export default function Navbar() {
  const [width, setWidth] = React.useState(window.innerWidth)
  const [renderBtn, setRenderBtn] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [menu, setMenu] = React.useState("closed")
  const location = useLocation()

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }

  function getUser() {
    const userCreds = JSON.parse(localStorage.getItem("user"))
    userCreds ? setUser(userCreds) : setUser(null)
  }

  React.useEffect(() => {
    getUser()

    const handleResize = () => {
      setWidth(window.innerWidth)
      setRenderBtn(window.innerWidth <= 560)
    }
    window.addEventListener("resize", handleResize)

    handleResize()

    setMenu("closed")
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [location])

  function logout() {
    localStorage.removeItem("user")
  }

  return (
    <nav className="nav">
      <Link className="nav-link" to="/">
        #VANLIFE
      </Link>
      {renderBtn ? (
        <a
          onClick={() =>
            setMenu((prev) => (prev === "closed" ? "open" : "closed"))
          }
          className="host-a"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      ) : null}
      <ul className={renderBtn ? menu : "nav-list"}>
        <div className={renderBtn && menu}>
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
          {!user ? (
            <>
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
            </>
          ) : (
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
          )}
        </div>
      </ul>
    </nav>
  )
}
