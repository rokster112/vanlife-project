import React from "react"
import { handleChange } from "./helpers/HandleChange"
import { createUser } from "../api"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [err, setErr] = React.useState(null)
  const [status, setStatus] = React.useState("idle")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setStatus("submitting")
    async function postData() {
      try {
        if (formData.password !== formData.confirmPassword) {
          setStatus("idle")
          throw new Error("Passwords do not match, try again")
        } else if (!formData.email || !formData.password) {
          setStatus("idle")
          throw new Error("Please fill in all fields")
        }
        const data = await createUser(formData.email, formData.password)
        console.log("User created!", data.email)
        navigate("/login", { replace: true })
      } catch (error) {
        setErr(error)
        console.error(error.message)
      } finally {
        setStatus("idle")
      }
    }
    postData()
  }

  return (
    <div className="register-body">
      {err && <h3 className="error">{err.message}</h3>}
      <h1>Register a new account</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="register-label">
          Email:
          <input
            className="register-input"
            type="email"
            name="email"
            placeholder="example@email.com"
            onChange={(e) => handleChange(e, setFormData, setErr)}
          />
        </label>
        <label className="register-label">
          Password:
          <input
            className="register-input"
            type="password"
            name="password"
            placeholder="create password"
            onChange={(e) => handleChange(e, setFormData, setErr)}
          />
        </label>
        <label className="register-label">
          Confirm Password:
          <input
            className="register-input"
            type="password"
            name="confirmPassword"
            placeholder="repeat password"
            onChange={(e) => handleChange(e, setFormData, setErr)}
          />
        </label>
        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="register-p">
        Already have an account?
        <Link to={"/login"} className="register-link">
          Log in now
        </Link>
      </p>
    </div>
  )
}
