import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import { getHostVans } from "../api"

export default function HostLayout() {
  const [vans, setVans] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState(null)
  const [typeOfList, setTypeOfList] = React.useState("listed")
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }

  const user = JSON.parse(localStorage.getItem("user"))
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getHostVans(user?.id, typeOfList)
        setVans(data)
        setErr(null)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [typeOfList, user.id])

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
      <Outlet
        context={{
          vans,
          loading,
          err,
          typeOfList,
          setTypeOfList,
        }}
      />
    </>
  )
}
