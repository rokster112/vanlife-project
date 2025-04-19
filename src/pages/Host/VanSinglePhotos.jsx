import { useOutletContext } from "react-router-dom"


export default function VanSinglePhotos() {

    const { van } = useOutletContext()

    return (
        <div className="photos-container">
            <img className="van-single__image" src={van.imageUrl} alt={`van with a name of ${van.name}`}/>
        </div>
    )
}