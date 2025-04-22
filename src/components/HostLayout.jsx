import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      <nav className="host-nav">
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          end
          className="nav-link"
          to={"/host"}
          state={{ userId: user.id }}
        >
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"income"}
          state={{ userId: user.id }}
        >
          Income
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"reviews"}
          state={{ userId: user.id }}
        >
          Reviews
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"vans"}
          state={{ userId: user.id }}
        >
          Vans
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"add"}
          state={{ userId: user.id }}
        >
          Add Van
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}
