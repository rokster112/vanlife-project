/* eslint-disable */

import React from "react"
import { handleChange } from "../helpers/HandleChange"
import { postVan } from "../../api"
import { useLocation, useNavigate } from "react-router-dom"

export default function HostAddVan() {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    type: "",
    imageUrl: null,
  })
  const [error, setError] = React.useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  function handleFileChange(e) {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const data = await postVan(location.state?.userId, {
        ...formData,
        price: Number(formData.price),
      })
      navigate("/host/vans", { state: { userId: location.state?.userId } })
    } catch (error) {
      setError(error)
      console.error(error.message)
    }
  }

  return (
    <div className="add-van__body">
      {error && <h3 className="error">{error.message}</h3>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="add-van__label">
          Name:
          <input
            className="add-van__input"
            type="text"
            name="name"
            placeholder="name of the van"
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        <label className="add-van__label">
          Description:
          <textarea
            className="add-van__input"
            type="text"
            name="description"
            placeholder="description of the van"
            onChange={(e) => handleChange(e, setFormData, setError)}
          ></textarea>
        </label>
        <label className="add-van__label">
          Price:
          <input
            className="add-van__input"
            type="number"
            name="price"
            placeholder="price of the van"
            onChange={(e) => handleChange(e, setFormData, setError)}
          />
        </label>
        <select
          required
          value={formData.type} // Controlled value
          name="type"
          onChange={(e) => handleChange(e, setFormData, setError)}
        >
          <option className="select-option" value={""} disabled>
            --Please select a type--
          </option>
          <option className="select-option" value={"rugged"}>
            Rugged
          </option>
          <option className="select-option" value={"simple"}>
            Simple
          </option>
          <option className="select-option" value={"luxury"}>
            Luxury
          </option>
        </select>
        <label className="add-van__label">
          Image:
          <input
            className="add-van__input"
            type="file"
            name="imageUrl"
            placeholder="image of the van"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
