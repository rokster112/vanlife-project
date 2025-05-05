export function CalcReviews(vans) {
  let obj = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  for (const van of vans) {
    for (const review of van.reviews) {
      obj[review.rating] += 1
    }
  }

  const reviewCount = vans.reduce((sum, van) => sum + van.reviews.length, 0)
  const average =
    vans
      .flatMap((item) => item.reviews)
      .reduce((sum, van) => sum + van.rating, 0) / reviewCount
  return { reviewCount, average, ratingDistribution: obj }
}
