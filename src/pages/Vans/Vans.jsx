import React from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { getVans } from "../../api"

export default function Vans() {
  const [vans, setVans] = React.useState([])
  const [err, setErr] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")
  const location = useLocation()

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getVans()
        setVans(data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans

  const displayVans =
    filteredVans &&
    filteredVans.map((van) => {
      return (
        <div className="van-card" key={van.id}>
          <Link
            to={`${van.id}`}
            state={{ search: searchParams.toString(), type: typeFilter }}
          >
            <div className="van-card__image-container">
              <img
                className="van-card__image"
                src={van.imageUrl}
                alt={`Van with a name of ${van.name}`}
              />
            </div>
            <div className="van-card__info">
              <h4>{van.name}</h4>
              <p>
                <span>${van.price}</span> <br /> /day
              </p>
            </div>
            <p className={`van-card__type ${van.type}`}>
              {van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}
            </p>
          </Link>
        </div>
      )
    })
  if (loading) return <h1 className="loading">Loading...</h1>

  if (err) {
    return <h1>There has been an error: {err.message}</h1>
  }

  return (
    <div className="vans-body">
      <h1>Explore our van options</h1>
      <div>
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={`vans-btn simple ${typeFilter === "simple" && "selected"}`}
        >
          Simple
        </button>
        <button
          className={`vans-btn luxury ${typeFilter === "luxury" && "selected"}`}
          onClick={() => setSearchParams({ type: "luxury" })}
        >
          Luxury
        </button>
        <button
          className={`vans-btn rugged ${typeFilter === "rugged" && "selected"}`}
          onClick={() => setSearchParams({ type: "rugged" })}
        >
          Rugged
        </button>
        <button
          disable={`${filteredVans === vans}`}
          className="vans-btn"
          onClick={() => setSearchParams({})}
        >
          Clear filters
        </button>
      </div>
      <div>{displayVans}</div>
    </div>
  )
}
