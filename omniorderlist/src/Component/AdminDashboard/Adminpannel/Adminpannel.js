import "./adminpannel.css"
import { Row, Col } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate,useLocation } from "react-router-dom";
import MyContext from "../../../MyContext";
import React, { useContext, useEffect, useState, } from "react";


const Adminpannel = () => {

    const navigate = useNavigate()
  

    const [clickedSideMenu, setClickedSideMenu] = useState("")
    let { handleShopToast, setShowLoder } = useContext(MyContext)

    const UserID = sessionStorage.getItem("loggedUserId")
    const UserRole = JSON.parse(sessionStorage.getItem("personalInfo")) || ""

    const sidemenuFunction = (e) => {
        setClickedSideMenu(e)
    }

    const logoutFunction = ()=>{
        // dispatch(logoutUser(null))
        sessionStorage.clear();
        setShowLoder(true)
    
        setTimeout(()=>{
        //   handleShopToast(true, 'Success', 'Logout sucessfully.')
          navigate("/")
        },1000)
      }

    console.log("clickedSideMenu", clickedSideMenu)
    return (
        <div className='main-Pannel-div' >
            {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/dashboard">Omni Schrew</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Omni Schrew
                </Offcanvas.Title>
              </Offcanvas.Header>
            
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <Nav.Link href="#" onClick={logoutFunction}>Logout</Nav.Link>

                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
                
              </Offcanvas.Body>
              
            </Navbar.Offcanvas>
            <div className="d-flex gap-2">
            <div className="d-flex justify-content-center align-items-center">
                  <h6 className="mt-1" >{UserRole.Email_Id}</h6>
                </div>
                <div className="d-flex justify-content-end logut-div" style={{ width: "30px" }} onClick={logoutFunction}>
                  <img src="logoutcircle.svg" className="img-fluid" style={{ cursor: "pointer" }} />
                </div>
            </div>
           
          </Container>
          
        </Navbar>
      ))}
            {/* <Row className='w-100 m-0 p-0'>
                <Col lg="12 w-100 m-0 p-0">
                    <Row className='w-100 d-flex m-0 p-0'>
                        <Col md="2" lg="2" className='Main-div-Left-Side-Col m-0 p-0'>
                            <div>
                                <div className='logo-div'>
                                    <h2 className='logo-tag-h1'>Omni Schrew</h2>
                                </div>
                                <div className='left-menu-main-div mt-4 px-2'>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px", }}>
                                            <img src={clickedSideMenu == 1 ? "dasboardmaroonpreview.png" : "dasboard1.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 1 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(1)}>Dashboard</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 2 ? "userred.png" : "userblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 2 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(2)}>My Info</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 3 ? "vanred.png" : "vanblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 3 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(3)}>Emergency</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 4 ? "agentplusred.png" : "agentplus.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 4 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(4)}>Agent Assigentment</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 5 ? "agentguide.png" : "agnetguideblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 5 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(5)}>Agent Guidence</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 6 ? "filecabinetred.png" : "filecabinetblack1.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 6 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(6)}>File Cabinet</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 7 ? "contactred.png" : "contactblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 7 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(7)}>Contacts</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 8 ? "rolered.png" : "roleblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 8 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(8)}>My Roles</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 9 ? "dashboard-seminar-Maroon.svg" : "dashboard-seminar.svg"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 9 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(9)}>Subscription</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 10 ? "help.png" : "helpblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 10 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(10)}>Help center</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex gap-4' style={{ height: "50px", cursor: "pointer" }}>
                                        <div className='' style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "30px" }}>
                                            <img src={clickedSideMenu == 11 ? "settingred.png" : "settingblack.png"} className='img-fluid' />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <h6 className={`${clickedSideMenu == 11 ? "side-menu-tag-red" : 'side-menu-tag'}`} style={{ marginTop: "10px" }} onClick={() => sidemenuFunction(11)}>Setting</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="10" lg="10" className='Main-div-Right-Side-Col m-0 p-0 '>
                            <div className='main-menu-top-div'>
                                <Menubar />
                            </div>
                            <div className='bg-light' >
                                <Row className='w-100 m-0 p-0 Ineer-Main-Div d-flex'>
                                    <Col className=' m-0 p-0 Ineer-Main-Col-Left' lg="9" ></Col>
                                    <Col className=' m-0 p-0 Ineer-Main-Col-Right' lg="3"></Col>
                                </Row>
                            </div>

                            <div className='main-menu-bottom-div w-100'>
                                <BottomMenubar />

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row > */}


        </div >
    )
}

export default Adminpannel
