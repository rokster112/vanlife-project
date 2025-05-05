import { deleteReview } from "../api"
import { FaStar } from "react-icons/fa"

export default function ReviewsCard({ van, userId, id, setRefreshKey }) {
  async function handleDelete() {
    await deleteReview(id, userId)
    setRefreshKey((prev) => (prev += 1))
  }

  return van.reviews.map((item, index) => {
    return (
      <div className="reviews-container" key={index}>
        <div className="star-container">
          {[...Array(item.rating)].map((_, i) => (
            <FaStar key={i} className="star" size={20} color="#FF8C38" />
          ))}
        </div>
        <div className="reviews-top">
          <p className="review-by">{item.by}</p>
          <p className="review-date">{item.date}</p>
        </div>
        <p className="review-text">{item.text}</p>
        {item.userId === userId ? (
          <button className="review-delete" onClick={handleDelete}>
            Delete
          </button>
        ) : null}
      </div>
    )
  })
}
