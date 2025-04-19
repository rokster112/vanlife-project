import React from "react"
import { Link } from "react-router-dom"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const [vanFilterArr, setVanFilterArr] = React.useState([])
    
    React.useEffect(() => {    
        fetch("api/vans")
        .then(res => res.json())
        .then(data => {
            setVans(data.vans)
            setVanFilterArr(data.vans)
        })
    }, [])

    const displayVans = vanFilterArr.map(van => {
        return (
            <div className="van-card" key={van.id}>
                <Link to={`${van.id}`}><div className="van-card__image-container">
                    <img className="van-card__image" src={van.imageUrl} alt={`Van with a name of ${van.name}`}/>
                </div>
                <div className="van-card__info">
                    <h4>{van.name}</h4>
                    <p><span>${van.price}</span> <br/> /day</p>
                </div>
                <p className={`van-card__type ${van.type}`}>{van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}</p>
                </Link>
            </div>
        )
    })
    
    function filterVans(type) {
        const filtered = vans.filter(van => van.type === type)
        return setVanFilterArr(filtered)
    }
    
    return (
        <div className="vans-body">
            {vans.length > 0 ? 
            <>
                <h1>Explore our van options</h1><div>
                <button className="vans-btn" onClick={() => filterVans('simple')}>Simple</button>
                <button className="vans-btn" onClick={() => filterVans('luxury')}>Luxury</button>
                <button className="vans-btn" onClick={() => filterVans('rugged')}>Rugged</button>
                <button disable={`${vanFilterArr !== vans}`} className="vans-btn" onClick={() => setVanFilterArr(vans)}>Clear filters</button>
            </div><div>
                    {displayVans}
                </div>
                </> : <h1 className="loading">Loading...</h1>}
        </div>
    )
}