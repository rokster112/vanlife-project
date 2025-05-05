/* eslint-disable */

import React from "react"
import { Link, replace, useLocation, useNavigate } from "react-router-dom"
import { handleChange } from "./helpers/HandleChange"
import { loginUser } from "../api"

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })

  const [user, setUser] = React.useState({})
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setStatus("submitting")
    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password")
      setStatus("idle")
      return
    }
    async function getUser() {
      try {
        const data = await loginUser(formData.email, formData.password)
        setError(null)
        setUser(data)
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.id, email: data.email }),
        )
        navigate("/host", { replace: true })
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setStatus("idle")
      }
    }
    getUser()
  }
  console.log("Error =>", error)
  return (
    <div className="login-body">
      {location.state?.message && (
        <h3 className="error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error && <h3 className="error">{error.message}</h3>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="login-label">
          Email:
          <input
            className="login-input"
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        <label className="login-label">
          Password:
          <input
            className="login-input"
            id="password"
            name="password"
            type="password"
            placeholder="current-password"
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        <button
          disabled={status === "submitting"}
          className="login-btn"
          type="submit"
        >
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p className="login-p">
        Don’t have an account?
        <Link to={"/register"} className="login-link">
          Create one now
        </Link>
      </p>
    </div>
  )
}
