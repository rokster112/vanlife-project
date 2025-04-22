/* eslint-disable */

import { Link, useLocation } from "react-router-dom"
import React from "react"
import { getHosts, getHostVans } from "../../api"

export default function HostAllVans() {
  const [vans, setVans] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState(null)
  const location = useLocation()

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getHostVans(location.state?.userId)
        setVans(data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const displayVans =
    vans.length > 0 &&
    vans.map((van) => (
      <Link
        className="host-vans__link"
        key={van.id}
        to={`${van.id}`}
        state={{ userId: location.state?.userId }}
      >
        <img
          className="host-vans__image"
          src={van.imageUrl}
          alt={`van with a name of ${van.name}`}
        />
        <div className="host-vans__details">
          <h4>{van.name}</h4>
          <p>${van.price}/day</p>
        </div>
      </Link>
    ))

  if (loading) return <h1 className="loading">Loading...</h1>

  if (err)
    return (
      <div className="error-host__vans">
        <h1>
          {err.message === "You have no vans in your list"
            ? err.message
            : `There has been an error:  ${err?.message}`}
        </h1>
        <h3>Would you like to add more vans?</h3>
        <Link
          className="error-btn"
          to={"/add"}
          state={{ userId: location.state?.userId }}
        >
          Add
        </Link>
      </div>
    )

  return (
    <div className="host-vans__container">
      <h1>Your listed vans</h1>
      {displayVans || <h1>No vans available</h1>}
    </div>
  )
}
