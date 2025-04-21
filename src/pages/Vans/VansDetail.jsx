import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Arrow from "../../images/Arrow 1.png"
import { getVan } from "../../api"

export default function VansDetail() {
  const [van, setVan] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState(null)
  const { id } = useParams()
  const location = useLocation()
  const search = location.state?.search || ""
  const type = location.state?.type || ""

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getVan(id)
        setVan(data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <h1 className="loading">Loading...</h1>

  if (err) return <h1>There has been an error: {err.message}</h1>
  return (
    Object.keys(van).length > 0 && (
      <div className="van">
        <Link to={`..?${search}`} relative="path">
          <img className="van-arrow" src={Arrow} alt="arrow pointing left" />
          Back to {type ? type : "all"} vans
        </Link>
        <div className="van-image__container">
          <img
            className="van-image"
            src={van.imageUrl}
            alt={`Van with a name of ${van.name}`}
          />
        </div>
        <p className={`van-card__type ${van.type}`}>
          {van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}
        </p>
        <h1>{van.name}</h1>
        <p className="van-price">
          <span className="van-span">${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button>Rent this van</button>
      </div>
    )
  )
}
