import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../CustomToaster/customtoaster.css"

export const Customtoaster = (props) => {
    // console.log('propspropsprops', props)
    const [show, setShow] = useState(props.showAlertMessage);

    let showErrorMsg = props.showErrorMsg
    // let showAlertMessage = props.showAlertMessage
    let textMessage = props.textMessage

    const handleClose = () => {
        // props.setShowAlertMessage()
        // setShowAlertMessage(false)
        // setShow(false)
    };

    setTimeout(() => {
        handleClose()

    }, 5000)



    // console.log("props", show)

    return (
        <div>
            <Modal show={show}
                // onHide={handleClose}
                backdrop={false}
            >
                {/* <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
                        <Modal.Title style={{ color: "white" }}>Entrance Code</Modal.Title>
                    </Modal.Header> */}
                <Modal.Body className={`${(showErrorMsg == "Error") ? "dataError" : "dataSucces"}`}>
                    <div className='d-flex  gap-3' >
                        {/* <h6 className='Entrance-tag-h6'>Field Me</h6> */}
                        <div>
                            <img src={`${showErrorMsg == "Error" ? "warning.png" : "success2.png"}`}
                                style={{ marginBottom: "1px" }} />
                        </div>
                        <div>
                            <span style={{ fontSize: "16px", fontWeight: 600, fontFamily: "sans-serif", }}>{textMessage}</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}
