import React, { useState, useEffect, useContext } from 'react';
import HashLoader from "react-spinners/HashLoader";
import MyContext from '../../MyContext';
import "./loaderpage.css"

const Loaderpage = ({ open, type }) => {
    let { setShowLoder } = useContext(MyContext)

    const [loadingState, setLoadingState] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            handlecloeMessage()

        }, 3000)
    }, [])



    const handlecloeMessage = () => {
        // setOpenn(false);
        setShowLoder(false)
    };


    return (
        <div>
            <div style={{
                // height: "100vh",
                height: "100%",
                display: "flex", justifyContent: "center", alignItems: "center",
                width: "100%", position: "fixed", zIndex: 99999, background: "rgba(0, 0, 0, 0.6)",
            }}>

                <div class="custom-loader"></div>
                {/* <HashLoader color="white" /> */}

            </div>


        </div>
    )
}

export default Loaderpage