/* eslint-disable */

import { useLocation, useOutletContext } from "react-router-dom"

export default function Dashboard() {
  const { vans, loading, err, typeOfList, setTypeOfList } = useOutletContext()
  const location = useLocation()
  console.log(vans)

  return (
    <div className="dashboard-body">
      <p>Dashboard - Work in progress Next available tab is VANS</p>
    </div>
  )
}
