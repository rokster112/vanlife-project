import { NavLink, Link } from "react-router-dom"
import React from 'react';


export default function Navbar() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "black"
    }
    return (
        <nav className="nav">
            <ul className="nav-list">
                <Link className="nav-link" to="/">#VANLIFE</Link>
                <div>
                    <NavLink style={({isActive}) => isActive ? activeStyle : null} className="nav-link" to={"host"}>Host</NavLink>
                    <NavLink style={({isActive}) => isActive ? activeStyle : null} className="nav-link" to={"about"}>About</NavLink>
                    <NavLink style={({isActive}) => isActive ? activeStyle : null} className="nav-link" to={"vans"}>Vans</NavLink>
                </div>
            </ul>
        </nav>
    )
}