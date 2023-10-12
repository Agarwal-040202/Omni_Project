import React, { useState } from 'react'
// import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { Navbar, Nav } from 'react-bootstrap';
// import "./menubar.css"
// import { Routes, Link, Route, useNavigate } from "react-router-dom";

export const BottomMenubar = () => {
    // const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    return (
        <div style={{}}>

            <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className=''>
                {/* <Navbar.Brand href="#">
                <div style={{ width: "35px" }}>
                    <img src="Hamburger_icon1.png" className='img-fluid' />
                </div>
            </Navbar.Brand> */}
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                <Navbar.Collapse id="responsive-navbar-nav " className='navbar-Div' >
                    <Nav className="me-auto" >
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>
                            About
                        </Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>
                            Security
                        </Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>Privacy</Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>Terms of Use</Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>Customer Support</Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>Refer a Friend</Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>Take a Tour</Nav.Link>
                        <Nav.Link href="#" style={{ color: "#6495ED" }}>Help</Nav.Link>

                    </Nav>
                    {/* <Nav className=''>
                    <div className='d-flex justify-content-center align-items-center gap-4' style={{ marginRight: "50px" }}>
                        <div className='d-flex p-0 m-0'>
                            <h6 className='m-0 p-0'>Sign Out</h6>
                        </div>
                        <div style={{ width: "28px" }}  >
                            <img src="usericon.png" className='img-fluid' />
                        </div>
                        <div style={{ width: "28px" }}  >
                            <img src="bell.png" className='img-fluid' />
                        </div>

                        <div style={{ width: "28px" }}  >
                            <img src="spouse1.png" className='img-fluid' />
                        </div>

                        <div style={{ width: "25px" }}>
                            <img src="Setup.png" className='img-fluid' />
                        </div>


                    </div>
                </Nav> */}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
