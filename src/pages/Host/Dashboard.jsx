/* eslint-disable */

import { useLocation, useOutletContext } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import React from "react"

export default function Dashboard() {
  const [showAll, setShowAll] = React.useState(false)
  const { vans, dashboardSummary } = useOutletContext()
  const location = useLocation()
  const vansDisplay =
    vans.length > 0 ? (
      vans.map((van) => (
        <div className="dashboard-vans__card">
          <img src={van.imageUrl} />
          <div>
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
        </div>
      ))
    ) : (
      <h3>You have no vans in your list</h3>
    )

  return (
    <div className="dashboard-body">
      <div className="dashboard-income">
        <h1>Welcome!</h1>
        <p>Total income</p>
        <h1>${dashboardSummary.income}</h1>
      </div>
      <div className="dashboard-review">
        <h2>Review score</h2>
        <FaStar size={20} color="#FF8C38" />
        <h3>
          {dashboardSummary.rating.average}
          <span>/5</span>
        </h3>
      </div>
      <div className="dashboard-vans">
        <h2>Your listed vans</h2>
        {!showAll && vans.length > 3 && (
          <button
            className="dashboard-vans__btn"
            onClick={() => setShowAll(true)}
          >
            View all
          </button>
        )}
        {vans.length > 3 && !showAll ? vansDisplay.slice(0, 3) : vansDisplay}
        {showAll && (
          <button
            className="dashboard-vans__btn"
            onClick={() => setShowAll(false)}
          >
            Close all
          </button>
        )}
      </div>
    </div>
  )
}
