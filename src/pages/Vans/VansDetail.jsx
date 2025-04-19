import React from "react"
import { Link, useParams } from "react-router-dom"
import Arrow from '../../images/Arrow 1.png'

export default function VansDetail() {
  const [van, setVan] = React.useState(null)
  const { id } = useParams();
  React.useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans))
  }, [id])

  return (
    <div className="van">
      {van ? 
      <>
        <Link to={'..'} relative="path"><img className="van-arrow" src={Arrow} alt="arrow pointing left"/>Back to all vans</Link>
        <div className="van-image__container">
          <img
            className="van-image"
            src={van.imageUrl}
            alt={`Van with a name of ${van.name}`}
          />
        </div>
        <p className="van-card__type" style={{
    backgroundColor:
      van.type === "simple"
        ? "#E17654"
        : van.type === "luxury"
          ? "#161616"
          : "#115E59",
    color: "white",
  }}>
          {van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}
        </p>
          <h1>{van.name}</h1>
          <p className="van-price">
            <span className="van-span">${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button>Rent this van</button>
      </> : <h1 className="loading">Loading...</h1>}
    </div>
  );
}
