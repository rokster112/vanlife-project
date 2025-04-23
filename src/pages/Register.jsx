import React from "react"
import { handleChange } from "./helpers/HandleChange"
import { createUser } from "../api"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  const [err, setErr] = React.useState(null)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    async function postData() {
      try {
        const data = await createUser(formData.email, formData.password)
        console.log("User created!", data.email)
        navigate("/login", { replace: true })
      } catch (error) {
        setErr(error)
        console.error(error.message)
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
            placeholder="current-password"
            onChange={(e) => handleChange(e, setFormData, setErr)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
