import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./writemodemodal.css"; // Import your custom CSS file

const Writemodemodal = () => {
    const [showWriteModeModalState, setShowWriteModeModalState] = useState(false);

    useEffect(() => {
        setShowWriteModeModalState(true);
    }, []);

    const handleWriteModeClose = () => {
        setShowWriteModeModalState(false);
    };

    return (
        <>
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
                        <h4 className='firmname-tag-h6 mb-3'>Choose a mode</h4>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} className="d-flex justify-content-center mb-3">
                                <Link to="/fourbox/pricelist" className="custom-btn primary-btn">
                                    Order Type mode
                                </Link>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} className="d-flex justify-content-center mb-3">
                                <Link to="/fourbox" className="custom-btn secondary-btn">
                                    Without Order Tpye
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button
                            onClick={handleWriteModeClose}
                            className="custom-btn close-btn"
                        >
                            Close
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Writemodemodal;
