/* eslint-disable */

import React from "react"
import { NavLink, Link, Outlet, useParams } from "react-router-dom"
import Arrow from "../../images/Arrow 1.png"
import { getHostVan } from "../../api"

export default function VanSingle() {
  const [loading, setLoading] = React.useState(false)
  const [van, setVan] = React.useState([])
  const [err, setErr] = React.useState(null)
  const { id } = useParams()

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  }

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getHostVan(id)
        setVan(data[0])
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <h1 className="loading">Loading...</h1>

  if (err) return <h1>There has been an error: {err.message}</h1>

  return (
    Object.keys(van).length > 0 && (
      <>
        <div className="van-single__body">
          <Link to={".."} relative="path">
            <img className="van-arrow" src={Arrow} alt="arrow pointing left" />
            Back to all vans
          </Link>
          <div className="van-single__top">
            <img
              className="van-single__image"
              src={van.imageUrl}
              alt={`van with a name of ${van.name}`}
            />
            <div className="van-single__top-details">
              <p className={`van-single__type van-card__type ${van.type}`}>
                {van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}
              </p>
              <h1>{van.name}</h1>
              <p className="van-price">
                <span className="van-span">${van.price}</span>/day
              </p>
            </div>
          </div>
        </div>
        <div className="host-van__site-wrapper">
          <nav className="host-van__single-nav">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              end
              className="nav-link"
              to={"."}
            >
              Details
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              className="nav-link"
              to={"pricing"}
            >
              Pricing
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              className="nav-link"
              to={"photos"}
            >
              Photos
            </NavLink>
          </nav>
          <Outlet context={{ van }} />
        </div>
      </>
    )
  )
}
