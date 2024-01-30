import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../CustomToaster/customtoaster.css";
import MyContext from '../../MyContext';

const CommToaster = ({ open, message, type }) => {
    let { handleShopToast } = useContext(MyContext)

    useEffect(() => {
        setTimeout(() => {
            handlecloeMessage();
        }, 3000);
    }, []);

    const handlecloeMessage = () => {
        // setOpenn(false);
        handleShopToast(false)
    };

    // console.log("opennopenn", open)
    return (
        <div >
            <Modal
                show={open}
                onHide={handlecloeMessage}
                backdrop={false}
                // style={{ width: "300px",marginLeft:"20px" }}
                size='sm'
            
            >
                {/* <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
            <Modal.Title style={{ color: "white" }}>Entrance Code</Modal.Title>
          </Modal.Header> */}

                <Modal.Body className={`${type === "Error" ? "dataError" : "dataSucces"}`} >
                    <div className='d-flex gap-3'>
                        {/* <h6 className='Entrance-tag-h6'>Field Me</h6> */}
                        <div>
                            <img
                                src={`${type === "Error" ? "warning.png" : "success2.png"}`}
                                style={{ marginBottom: "1px" }}
                                alt={type === "Error" ? "Error" : "Success"}
                            />
                        </div>
                        <div>
                            <span style={{ fontSize: "16px", fontWeight: 600, fontFamily: "sans-serif" }}>
                                {message}
                            </span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CommToaster;
