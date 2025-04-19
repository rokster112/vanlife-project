import { Link } from "react-router-dom"
import React from "react"



export default function VansHost() {
    const [vans, setVans] = React.useState()
    
    React.useEffect(() => {    
            fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => {
                setVans(data.vans)
            })
        }, [])
    
    const displayVans = vans && vans.map(van => (
            <Link className="host-vans__link" key={van.id} to={`${van.id}`}>
                <img className="host-vans__image" src={van.imageUrl} alt={`van with a name of ${van.name}`}/>
                <div className="host-vans__details">
                    <h4>{van.name}</h4>
                    <p>${van.price}/day</p>
                </div>
            </Link>
    ))
    
    return vans ? (
        <div className="host-vans__container">
            <h1>Your listed vans</h1>
            {displayVans}
        </div>
    ) : <h1 className="loading">Loading...</h1>
}