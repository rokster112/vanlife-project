/* eslint-disable */

import { Link, useLocation, useOutletContext } from "react-router-dom"
import React from "react"

export default function HostAllVans() {
  const location = useLocation()
  const { vans, loading, err, typeOfList, setTypeOfList } = useOutletContext()

  const listBtn = (
    <button
      className="host-vans__btn"
      onClick={() =>
        setTypeOfList((prev) => (prev === "listed" ? "rented" : "listed"))
      }
    >
      {typeOfList === "listed" ? "Rented Vans" : "Listed Vans"}
    </button>
  )

  const displayVans =
    vans.length > 0 &&
    vans.map((van) => (
      <Link
        className="host-vans__link"
        key={van.id}
        to={`${van.id}`}
        state={{ userId: location.state?.userId, typeOfList: typeOfList }}
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
        {listBtn}
        <h1>
          {err.message === "You have no vans in your list"
            ? err.message
            : `There has been an error:  ${err?.message}`}
        </h1>
        <h3>
          {typeOfList === "listed"
            ? "Would you like to add more vans?"
            : "You are not renting any vans"}
        </h3>
        <Link
          className="error-btn"
          to={typeOfList === "listed" ? "/host/add" : "/vans"}
          state={{ userId: location.state?.userId }}
        >
          {typeOfList === "listed" ? "Add" : "Browse vans"}
        </Link>
        {typeOfList === "rented" ? <p>Or go back to your listed vans</p> : null}
      </div>
    )

  return (
    <div className="host-vans__container">
      {listBtn}
      <h1>
        {typeOfList === "rented" ? "Your rented vans" : "Your listed vans"}
      </h1>

      {displayVans || "No vans to display"}
    </div>
  )
}
