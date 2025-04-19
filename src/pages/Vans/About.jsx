import { Link} from "react-router-dom"
import React from 'react';
import aboutImage from "../../images/about-image.png"

export default function About() {
    return (
        <div className="about-body">
            <div className="about-top">
                <img className="about-image" alt="Man sitting on top of a camping van" src={aboutImage}/>
            </div>
            <div className="about-middle">
                <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉) <br/><
                span className="about-middle__br"></span> Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
            </div>
            <div className="about-bottom">
                <h2>Your destination is waiting. Your van is ready.</h2>
                <Link className="link-btn" to="/vans">Explore our vans</Link>
            </div>
        </div>
    )
}