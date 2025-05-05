/* eslint-disable */

import React from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import Arrow from "../../images/Arrow 1.png"
import { getVan, rentVan } from "../../api"
import Reviews from "../../components/Reviews"

export default function VansDetail() {
  const [van, setVan] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [redirecting, setRedirecting] = React.useState(false)
  const [err, setErr] = React.useState(null)
  const [refreshKey, setRefreshKey] = React.useState(0)

  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const search = location.state?.search || ""
  const type = location.state?.type || ""
  const user = JSON.parse(localStorage.getItem("user"))

  let buttonText = "Rent this van"
  let btnDisable = false

  if (user !== null) {
    if (van.rented && van.rented !== user.id) {
      buttonText = "Van has been rented out"
      btnDisable = true
    } else if (van.hostId === user.id) {
      buttonText = "Your listed van"
      btnDisable = true
    } else if (van.rented === user.id) {
      buttonText = "Remove van"
      btnDisable = false
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getVan(id)
        setVan(data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refreshKey])

  function handleRent() {
    async function rent() {
      try {
        if (user) {
          await rentVan(id, user.id)
          setRedirecting(true)
          console.log("van =>", van)
          setTimeout(() => {
            setRedirecting(false)
            navigate("/host/vans", {
              state: { userId: user.id },
            })
          }, 2000)
        } else {
          throw new Error("You must be logged in to rent a van")
        }
      } catch (error) {
        setErr(error)
      }
    }
    rent()
  }

  if (redirecting)
    return (
      <h1 className="redirecting">You are being redirected, please wait...</h1>
    )

  if (loading) return <h1 className="loading">Loading...</h1>

  return (
    Object.keys(van).length > 0 && (
      <div className="van">
        <Link to={`..?${search}`} relative="path">
          <img className="van-arrow" src={Arrow} alt="arrow pointing left" />
          Back to {type ? type : "all"} vans
        </Link>
        <div>
          <div className="van-image__container">
            <img
              className="van-image"
              src={van.imageUrl}
              alt={`Van with a name of ${van.name}`}
            />
          </div>
          <p className={`van-card__type ${van.type}`}>
            {van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}
          </p>
          <h1>{van.name}</h1>
          <p className="van-price">
            <span className="van-span">${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button
            style={{
              background: btnDisable ? "#8b7e74" : "",
            }}
            onClick={handleRent}
            disabled={btnDisable}
          >
            {buttonText}
          </button>
          {err && (
            <h3 className="error">
              {err.message}
              <Link
                style={{ textDecoration: "underline" }}
                className="login-link"
                to={"/login"}
              >
                Login here
              </Link>
            </h3>
          )}
        </div>
        <Reviews
          van={van}
          userId={user?.id}
          id={id}
          userEmail={user?.email}
          setRefreshKey={setRefreshKey}
        />
      </div>
    )
  )
}
