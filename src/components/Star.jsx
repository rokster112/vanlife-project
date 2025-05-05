import { FaStar } from "react-icons/fa"

export default function Star({ rating, setForm }) {
  console.log(rating)
  function handleRatingChange(i) {
    setForm((prev) => ({ ...prev, rating: i + 1 }))
  }
  const starArray = [...Array(5)].map((_, i) => (
    <div className="star" key={i}>
      <FaStar
        color={i < rating ? "#FFD700" : "#ccc"}
        size={24}
        name="rating"
        onClick={() => handleRatingChange(i)}
        onMouseOver={() => handleRatingChange(i)}
      />
    </div>
  ))

  return <div className="star-container">{starArray}</div>
}
