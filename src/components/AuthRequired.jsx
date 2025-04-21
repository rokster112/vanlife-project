import { Navigate, Outlet } from "react-router-dom"

export default function AuthRequired() {
  const loggedIn = JSON.parse(localStorage.getItem("user"))
  if (!loggedIn) {
    return (
      <Navigate
        to={"/login"}
        replace
        state={{ message: "You must be looged in" }}
      />
    )
  }
  return <Outlet />
}
