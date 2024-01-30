import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import MyContext from "../../MyContext";
import "./otpcode.css"

const Otpcode = (props) => {
    let { handleShopToast, setShowLoder } = useContext(MyContext)

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(6).fill(''))
    const [activeOtpIndex, setActiveOtpIndex] = useState(0)
    const [currentOtpValue, setCurrentOtpValue] = useState([])
    const [showOtpPage, setHideOtpPage] = useState(false)

    let currentOtpIndex = 0;

    useEffect(() => {
        inputRef.current?.focus()

    }, [activeOtpIndex, currentOtpIndex])

    const getOtp = [...otp];

    const handleOnChange = (e, index) => {
        // console.log("kkkkkkkkkk", e.target.value)

        getOtp[index] = e.target.value
        setOtp(getOtp)
        setCurrentOtpValue(getOtp)
        if (!e.target.value) {
            setActiveOtpIndex(currentOtpIndex - 1)
        }
        else {
            setActiveOtpIndex(currentOtpIndex + 1)
        }
    }

    // console.log("getOtp", currentOtpValue)

    const handleKeyDown = (e, index) => {
        // console.log("asdadadad", e.key, index)
        currentOtpIndex = index

        if (e.key === "Tab") {
            e.preventDefault();
            setActiveOtpIndex(currentOtpIndex + 1)
        }
        if (e.key === 'Backspace' && !e.target.value) {
            // console.log("asdsssadadad", currentOtpIndex)
            e.preventDefault();
            setActiveOtpIndex(currentOtpIndex - 1)
        }

    }



    const handleSubmit = async () => {
        if (currentOtpValue == "") {
            handleShopToast(true, 'Error', 'Enter the field member code.')
        }
        else {

            try {
                let arr1 = [];
                arr1 = currentOtpValue
                let JsonObj = {
                    "User_Code": arr1.join(""),
                    "User_Role": "Field Member"
                }

                // console.log('inputObject2', JsonObj)

                const respos = await axios.post("http://localhost:8000/api/auth/find/logincode", JsonObj, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // console.log("response", respos.data[0]?.User_Code)

                const dataObj = { userCode: respos.data[0]?.User_Code, UserRole: respos.data[0]?.User_Role }

                if (respos) {
                    setHideOtpPage(true)
                    setShowLoder(true)
                    setTimeout(() => {
                        navigate("/adminlogin", {
                            // userRole:"",
                            // userCode: respos.data[0]?.User_Code,
                            state: dataObj
                        })

                    }, 2000)
                    // handleClose()

                }
                else {
                    handleShopToast(true, 'Error', 'Please enter the valid code.')

                }
            }
            catch (error) {
                // console.log("responsekkklk", error)

                handleShopToast(true, 'Error', 'Please enter the valid code.')

            }

        }
    }

    return (
        <div className='d-flex justify-content-center' style={{ height: "87.6vh" }} >
            {/* <Modal show={props.otpCodeState} onHide={handleClose}
                centered
                backdrop={false}
            >
                <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
                    <Modal.Title style={{ color: "white" }}>Entrance Code</Modal.Title>
                </Modal.Header>
                <Modal.Body> */}
            {showOtpPage == true ? "" : <>
                <div className='main-otp-div'>

                    <div className='d-flex justify-content-center align-items-center mb-4'>
                        <img src="Omni-Logo-1.png" alt="" />
                    </div>
                    <div className='mb-4'>
                        <h6 className='Entrance-tag-h6'>Field Member Entrance Code</h6>
                    </div>

                    <div className="otp-input mb-4">
                        {
                            otp.map((_, index) => {
                                return (
                                    <div key={index}>
                                        <input type="text" ref={activeOtpIndex == index ? inputRef : null} className='test' id="digit-1" maxLength="1"
                                            onChange={(e) => handleOnChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className='d-flex justify-content-end'>

                        <div  onClick={handleSubmit}
                        style={{backgroundColor:"maroon",
                      color:"white",
                      padding:"6px",
                      cursor:"pointer",
                      borderRadius:"5px",
                    fontWeight:"normal"
                    }}
                        >
                          Submit
                        </div>

                        {/* <Button className='btn-submit' style={{
                            
                        }} onClick={handleSubmit}>
                            Submit
                        </Button> */}
                    </div>
                </div>
            </>}

            {/* </Modal.Body>
                <Modal.Footer>
                   
                </Modal.Footer>
            </Modal> */}


        </div>
    )
}

export default Otpcode