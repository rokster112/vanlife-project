import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }
  return (
    <>
      <nav className="host-nav">
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          end
          className="nav-link"
          to={"/host"}
        >
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"income"}
        >
          Income
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"reviews"}
        >
          Reviews
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="nav-link"
          to={"vans"}
        >
          Vans
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}
