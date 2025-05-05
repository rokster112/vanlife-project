import { useOutletContext } from "react-router-dom"
import ReviewsCard from "../../components/ReviewsCard"
import { FaStar } from "react-icons/fa"
import React from "react"

export default function HostReviews() {
  const { vans, dashboardSummary, err } = useOutletContext()

  if (err) return <h3 className="error-msg">You have no reviews</h3>

  if (vans.length === 0) return <h1 className="loading">Loading...</h1>

  const reviews = vans.map((item, i) => <ReviewsCard key={i} van={item} />)

  const ratingBreakdown = Object.entries(
    dashboardSummary.rating.ratingDistribution,
  ).map(([key, value]) => (
    <div className="reviews-breakdown__container" key={key}>
      <p className="reviews-stars">{key} stars</p>
      <div
        className="reviews-bar"
        style={{
          width: "100%",
          height: "10px",
          background: `linear-gradient(to right, orange 0%, orange ${Math.round((value / dashboardSummary.rating.reviewCount) * 100)}%, #B9B9B9 ${Math.round((value / dashboardSummary.rating.reviewCount) * 100)}%, #B9B9B9 100%)`,
          borderRadius: "6px",
        }}
      ></div>
      <p className="reviews-precentage">
        {Math.round((value / dashboardSummary.rating.reviewCount) * 100)}%
      </p>
    </div>
  ))
  return (
    <div className="host-reviews">
      <h2>Your reviews</h2>
      <div className="host-reviews__average">
        <h1>{dashboardSummary.rating.average}</h1>
        <FaStar size={24} color="#FF8C38" />
        <p>overall rating</p>
      </div>
      <div className="host-reviews__breakdown">{ratingBreakdown}</div>
      <h4>
        Reviews <span>({dashboardSummary.rating.reviewCount})</span>
      </h4>
      {reviews}
    </div>
  )
}
