import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="notfound-body">
      <h1 className="notfound-title">
        Sorry, the page you were looking for was not found.
      </h1>
      <Link className="notfound-link" to={"/"}>
        Return to home
      </Link>
    </div>
  )
}
