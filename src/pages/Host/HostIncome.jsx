import { useOutletContext } from "react-router-dom"

export default function HostIncome() {
  const { dashboardSummary } = useOutletContext()

  return (
    <div className="income-body">
      <h1>Total income for this month</h1>
      <h3>{dashboardSummary.income}$</h3>
    </div>
  )
}
