import React, { useEffect } from 'react'
import Sliderpage from '../Sliderpage/Sliderpage'
// import "../Home/homepage.css"
import ReactPlayer from 'react-player'
const Homepage = () => {


    return (
        <div
  style={{
    position: "relative",
    maxHeight: "90vh",
    overflow: "hidden",
    // border: "1px solid red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0,0,0,0.9)"

  }}
>
  <video
    autoPlay
    loop
    muted
    playsInline
    src="./Omniscrew1.mp4"
    style={{
      width: "100%",
      height: "auto",
    }}
  ></video>
</div>

    )
}

export default Homepage