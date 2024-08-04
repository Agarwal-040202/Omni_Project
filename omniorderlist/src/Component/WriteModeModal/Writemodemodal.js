import { Modal } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../MyContext";
import Button from "react-bootstrap/Button";

import "./writemodemodal.css"; // Import your custom CSS file

const Writemodemodal = () => {
    const navigate = useNavigate()
    let { handleShopToast, setShowLoder } = useContext(MyContext)

    const [showWriteModeModalState, setShowWriteModeModalState] = useState(false);

    useEffect(() => {
        setShowWriteModeModalState(true);
    }, []);

    const handleWriteModeClose = () => {
        logoutFunction()
        setShowWriteModeModalState(false);
    };

    const logoutFunction = () => {
        // dispatch(logoutUser(null))
        sessionStorage.clear();
        setShowLoder(true)

        setTimeout(() => {
            handleShopToast(true, 'Success', 'Logout sucessfully.')
            navigate("/")

        }, 1000)
        // window.location.reload()

    }

    const saveKeyFunction = (data) => {
        sessionStorage.setItem('OrderTypemode', data);
    }

    return (
        <>
            <div style={{ height: "750px" }}>
                <Modal
                    show={showWriteModeModalState}
                    onHide={handleWriteModeClose}
                    centered
                    backdrop={false}
                    size="lg"
                    style={{ zIndex: 9 }}
                >
                    <Modal.Body>
                        <div>
                            <h4 className='firmname-tag-h6 mb-4'>Choose a mode</h4>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} className="d-flex justify-content-center mb-3">
                                    <Button
                                        type="submit"
                                        onClick={(e) => saveKeyFunction("OrderTypemode")}
                                        style={{
                                            backgroundColor: "#52c41a", // Change background color
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50px",
                                            padding: "8px 16px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            width:"140px"
                                        }}
                                    >
                                        <Link
                                            // to={{ pathname: "pricelist" }}
                                            to={{pathname:"/fourbox"}}
                                            state={"1111"}
                                            style={{ color: "white", textDecoration: "none" }}
                                        >
                                            Manual Mode
                                        </Link>
                                    </Button>
                                </Col>
                                {/* <Col xs={24} sm={24} md={12} lg={12} className="d-flex justify-content-center mb-3">
                                    <Link
                                        to="/fourbox"
                                        className="custom-btn secondary-btn"
                                        style={{
                                            backgroundColor: "black", // Change background color
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50px",
                                            padding: "8px 16px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            textDecoration: "none",
                                            width:"140px"
                                        }}
                                    >
                                        Auto Mode
                                    </Link>
                                </Col> */}
                            </Row>



                        </div>
                        <div className='d-flex justify-content-end mt-2'>
                            <button
                                onClick={handleWriteModeClose}
                                className="custom-btn close-btn"
                            >
                                Close
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default Writemodemodal;
