import React, { useEffect } from 'react'
import Sliderpage from '../Sliderpage/Sliderpage'
// import "../Home/homepage.css"
import ReactPlayer from 'react-player'
const Homepage = () => {


    return (
        < div style={{ maxHeight: "90vh", height: "auto", overflow: "hidden", 
        // background: "black" 
        }}>

            <video autoPlay loop src="./Omniscrew1hjhjhjh.mp4" muted allowFullscreen style={{ pointerEvents: "none", maxWidth: "100%", width: "100%" }} >
            </video>

        </div>
    )
}

export default Homepage