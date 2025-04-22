import { useOutletContext } from "react-router-dom"

export default function HostPricing() {
  const { van } = useOutletContext()
  return (
    <p className="pricing-p">
      <span className="pricing-span">${van.price.toFixed(2)}</span>/day
    </p>
  )
}
