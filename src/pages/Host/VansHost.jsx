import { Link } from "react-router-dom"
import React from "react"
import { getHosts, getHostVans } from "../../api"

export default function VansHost() {
  const [vans, setVans] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState(null)

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const users = await getHosts()
        const data = await getHostVans()
        setVans(data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const user = JSON.parse(localStorage.getItem("user"))
  console.log("user data =>", user.id)

  const displayVans =
    vans.length > 0 &&
    vans.map((van) => (
      <Link className="host-vans__link" key={van.id} to={`${van.id}`}>
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

  if (err) return <h1>There has been an error: {err.message}</h1>

  return (
    <div className="host-vans__container">
      <h1>Your listed vans</h1>
      {displayVans || <h1>No vans available</h1>}
    </div>
  )
}
