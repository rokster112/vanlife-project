import { useOutletContext } from "react-router-dom"



export default function VanSingleDetails() {
    const { van } = useOutletContext()

    return (
        <div className="details-list">
            <p><span className="details-span">Name: </span>{van.name}</p>
            <p><span className="details-span">Category: </span>{van.type[0].toUpperCase() + van.type.slice(1, van.type.length)}</p>
            <p><span className="details-span">Description: </span>{van.description}</p>
            <p><span className="details-span">Visibility: </span>Visible</p>
        </div>
    )
}