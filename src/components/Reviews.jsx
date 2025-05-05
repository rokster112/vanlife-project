/* eslint-disable */

import { postReview } from "../api"
import { handleChange } from "../pages/helpers/HandleChange"
import React from "react"
import Star from "./Star"
import { FaStar } from "react-icons/fa"
import ReviewsCard from "./ReviewsCard"

export default function Reviews({ van, userId, id, userEmail, setRefreshKey }) {
  const [err, setErr] = React.useState(null)
  const [formData, setFormData] = React.useState({
    text: "",
    rating: 1,
  })

  let averageRating = 0
  for (const item of van.reviews) {
    averageRating += item.rating
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = await postReview(formData, id, userId, userEmail)
      setRefreshKey((prev) => (prev += 1))
    } catch (error) {
      console.error(error)
    }
  }

  const foundReview = van.reviews.find((item) => item.userId === userId)

  return (
    <>
      <h3>Reviews</h3>
      <div className="reviews-average">
        {van.reviews.length > 0
          ? (averageRating / van.reviews.length).toFixed(2)
          : 0}{" "}
        <FaStar size={20} color="#FF8C38" /> Overall rating
      </div>
      {van.reviews.length > 0 ? (
        <ReviewsCard
          van={van}
          userId={userId}
          id={id}
          setRefreshKey={setRefreshKey}
        />
      ) : (
        <h3>No reviews to show</h3>
      )}
      {van.rented === userId && !foundReview ? (
        <div className="review-form__container">
          <h2>Leave a review below!</h2>
          <form onSubmit={handleSubmit}>
            <Star rating={formData.rating} setForm={setFormData} />
            <textarea
              onChange={(e) => handleChange(e, setFormData, setErr)}
              cols={45}
              rows={10}
              type="text"
              name="text"
              placeholder="Write your review"
              style={{ marginBottom: "10px" }}
            ></textarea>
            <button type="submit">Send!</button>
          </form>
        </div>
      ) : null}
    </>
  )
}
