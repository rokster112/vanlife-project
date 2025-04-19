import { NavLink, Outlet, useParams } from "react-router-dom"
import VanSingle from "../pages/Host/VanSingle"
import React from "react"


export default function VanSingleLayout() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "black",
    }

    const { id } = useParams()

    const [van, setVan] = React.useState(null)
        
        React.useEffect(() => {
            fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans[0]))
        }, [id])

    if(!van) return <h1 className="loading">Loading.....</h1>

    return (
        <div className="host-van__site-wrapper">
            <VanSingle van={van}/>
            <nav className="host-van__single-nav">
                <NavLink style={({isActive}) => isActive ? activeStyle : null} end className="nav-link" to={"."}>Details</NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : null} className="nav-link" to={"pricing"}>Pricing</NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : null} className="nav-link" to={"photos"}>Photos</NavLink>
            </nav>
            <Outlet context={{van}}/>
        </div>
    )
}