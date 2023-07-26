import React from "react";
import "./footerpage.css"
import { Row, Col } from "react-bootstrap"

const FooterPAge = () => {

    return (
        <>
            <footer className="footer">
                <div className="footer-column">
                    <div>
                        <img
                            src="./Omni-Logo-2.png"
                        // style={{ width: "80px" }}
                        />
                    </div>
                    <div className="">
                        <span style={{ color: "white", marginLeft: "20px" }}>
                            SINCE 1992
                        </span>
                    </div>

                    <div className="mt-3">
                        <h2 style={{ color: "wheat" }}>About US</h2>
                        <p style={{ color: "white" }}>R P STEEL Established in 1992, Brand Omni has emerged as a pioneer of Stainless Steel Screws in India. </p>
                        <p style={{ color: "white" }}>After years of hard work R P STEEL through its brand Omni has now become the leading manufacture in stainless steel screws whose products are sold across India.</p>
                    </div>

                </div>
                <div className="footer-column1 col-div-1 ">
                    <div style={{}}>
                        <div className="d-flex gap-3 ancher-div">
                            <a href="#">Home</a>
                            <a href="#">Product</a>
                            <a href="#">Gallary</a>
                            <a href="#">Enquiry</a>
                            <a href="#">About US</a>
                            <a href="#">Contact US</a>
                        </div>

                    </div>


                </div>
                <div className="footer-column col-div-2">
                    <div className="footer-image-two-div">
                        <img
                            src="./sliderimg9.png"
                            style={{ width: "80px" }}
                        />
                    </div>

                    <div className="mt-3">
                        <h2 style={{ color: "wheat" }}>Contact US</h2>

                        <Row className="w-100 mt-3" style={{}}>
                            <Col xs="2" sm="2" md="2" lg="2">
                                <div>
                                    <div>
                                        <img src="location1.jpg" style={{ width: "100%" }} />

                                    </div>
                                </div>
                            </Col>
                            <Col xs="10" sm="10" md="10" lg="10" >
                                <div className="mx-1">
                                    <p style={{ color: "white" }}><span>R P STEEL</span><br />
                                        Sandasar, Talab Ganipura, Jhajjar Road,
                                        Rohtak, Haryana – 124 001</p>
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs="2" sm="2" md="2" lg="2"> <div>
                                <img src="contact1.png" style={{ width: "100%" }} />

                            </div></Col>
                            <Col xs="10" sm="10" md="10" lg="10">
                                <div className="mx-1">
                                    <p style={{ color: "white" }}><span>+91 981 2020 428</span><br />
                                        +91 981 2065 585</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="2" sm="2" md="2" lg="2" className="d-flex justify-content-center">
                                <div style={{ width: "26px" }}>
                                    <img src="email7.png" style={{ width: "100%" }} />

                                </div>
                            </Col>
                            <Col xs="10" sm="10" md="10" lg="10">
                                <div className="mx-1">
                                    <p style={{ color: "white" }}>info@omniscrews.com</p>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </div>

            </footer >
            <div className="d-flex justify-content-center" style={{ background: "rgb(0,0,0,0.9)" }}>
                <h6 style={{ color: "whitesmoke" }}>Copyright 2016 © Omni Screws.</h6>
            </div>
        </>
    )
}

export default FooterPAge