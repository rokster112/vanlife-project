import React from "react"
import { Link } from "react-router-dom"
import Arrow from '../../images/Arrow 1.png'

export default function VanSingle({van}) {

    return van ? (
        <div className="van-single__body">
            <Link to={".."} relative="path"><img className="van-arrow" src={Arrow} alt="arrow pointing left"/>Back to all vans</Link>
            <div className="van-single__top">
                <img className="van-single__image" src={van.imageUrl} alt={`van with a name of ${van.name}`}/>
                <div className="van-single__top-details">
                    <p className="van-single__type van-card__type" style={{
    backgroundColor:
    van.type === "simple"
        ? "#E17654"
        : van.type === "luxury"
        ? "#161616"
        : "#115E59",
    color: "white",}}>{van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}</p>
                    <h1>{van.name}</h1>
                    <p className="van-price">
            <span className="van-span">${van.price}</span>/day
        </p>
                </div>
            </div>
        </div> 
    ): <h1 className="loading">Loading...</h1>
}