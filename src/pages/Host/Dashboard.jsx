/* eslint-disable */

import { useEffect } from "react"
import { useLocation, useOutletContext } from "react-router-dom"

export default function Dashboard() {
  const { vans, dashboardSummary } = useOutletContext()
  const location = useLocation()
  console.log(dashboardSummary)
  return (
    <div className="dashboard-body">
      <p>Dashboard - Work in progress Next available tab is INCOME</p>
    </div>
  )
}
