export function handleChange(e, setData, setErr) {
  const { name, value } = e.target
  setData((prev) => ({ ...prev, [name]: value }))
  setErr(null)
}
