export function CalcIncome(vans) {
  const income = vans.reduce(
    (sum, van) => sum + van.reviews.length * van.price,
    0,
  )
  return income
}
