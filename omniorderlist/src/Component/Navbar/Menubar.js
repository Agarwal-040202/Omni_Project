import React, { useContext, useEffect, useState, } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MyContext from "../../MyContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import "../Navbar/menubar.css"
import { logoutUser } from "../../Redux/Slice/authSlice";
import { getFiledMemberData } from "../../Redux/Slice/getFieldMemberDataSlice"


const Menubar = () => {
  const dispatch = useDispatch()
  const linkDataProps = useLocation()

  const [fakeState, setFakeState] = useState(false)

  // console.log("linkDataProps", linkDataProps?.pathname)
  const UserID = sessionStorage.getItem("loggedUserId")
  const UserRole = JSON.parse(sessionStorage.getItem("personalInfo")) || ""
  const OrderTypemodeVariable = sessionStorage.getItem("OrderTypemode")

  // console.log("OrderTypemodeVariable", OrderTypemodeVariable)
  let { handleShopToast, setShowLoder } = useContext(MyContext)

  const { fileldMemberDetailStatus, filedMemberRecored } = useSelector((state) => state.getFiledMemberData)

  const navigate = useNavigate()

  const showFildeMemberFuction = () => {
    dispatch(getFiledMemberData(UserID));
    if (fileldMemberDetailStatus == "pending") {
      setShowLoder(true)

    }
    else if (fileldMemberDetailStatus == "Success") {
      navigate("/addfieldmember",

        {
          state: filedMemberRecored,

        }
      )
    }

  }

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

  useEffect(() => {

    setFakeState(!fakeState)
  }, [linkDataProps])



  return (
    <div>
      {UserRole.User_Role == "Field Member" ?
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            className="navbar-light"
            style={{ backgroundColor: "white" }}
          >

            <Container fluid className="p-0">
              {/* <Link 
          to="/" style={{ textDecoration: "none",marginLeft:"10px" }}>
            <div className="ml-2">
              <img src="images/Omni-Logo-1.png" alt="" className="d-inline-block align-text-top w-50" />
            </div>
          </Link> */}
              <Link style={{ textDecoration: "none", color: "white", fontSize: "9px", fontWeight: "600" }}>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div className="">
                    <img
                      src="/Omni-Logo-2.png"
                      style={{ width: "80px" }}
                    />
                  </div>
                  <div>
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      SINCE 1992
                    </span>
                  </div>
                </div>

              </Link>
              {/* {console.log("hhhlhlhl", linkDataProps)} */}
              {linkDataProps?.pathname == "/fourbox/pricelist" || linkDataProps?.pathname == "/writemodemodal/pricelist" || linkDataProps?.pathname == "/cskphillip"
                || linkDataProps?.pathname == "/panphillip" || linkDataProps?.pathname == "/cskslotted" || linkDataProps?.pathname == "/panslotted"
                || linkDataProps?.pathname == "/cskslottedwood" || linkDataProps?.pathname == "/cskphilipwood"
                || linkDataProps?.pathname == "/drywall410"
                || linkDataProps?.pathname == "/cskphilpsds410" || linkDataProps?.pathname == "/panphilpsds410"
                || linkDataProps?.pathname == "/hexheadsdsepdm410"
                || linkDataProps?.pathname == "/hexheadsdsmetalbondedepdm410" || linkDataProps?.pathname == "/cskphillipchipboard"
                || linkDataProps?.pathname == "/omnicutchipboard"
                || linkDataProps?.pathname == "/fullcut410" || linkDataProps?.pathname == "/combiwithwashermachine"
                || linkDataProps?.pathname == "/machinebswthread"
                || linkDataProps?.pathname == "/machinemmthread" || linkDataProps?.pathname == "/cskphillmachinemmthread"
                || linkDataProps?.pathname == "/zinkchipboard" || linkDataProps?.pathname == "/blackgypsum" || linkDataProps?.pathname == "/chromefinish"
                || linkDataProps?.pathname == "/combinationwithwasherms"
                || linkDataProps?.pathname == "/carriagebolt12mm" || linkDataProps?.pathname == "/carriagebolt14mm"
                || linkDataProps?.pathname == "/nailsheadless" || linkDataProps?.pathname == "/nailroundhead"
                || linkDataProps?.pathname == "/cskphillipsantique" || linkDataProps?.pathname == "/cskphillipsrosegold"
                || linkDataProps?.pathname == "/cskphillipsautoblackfinish" || linkDataProps?.pathname == "/fullcut410antique"
                || linkDataProps?.pathname == "/kitchenbasketscrew" || linkDataProps?.pathname == "/cskphillipsgolden"
                || linkDataProps?.pathname == "/fullcut410golden"
                || linkDataProps?.pathname == "/drywall410antique" || linkDataProps?.pathname == "/drywall410golden"
                ?
                <>
                  <div style={{ marginRight: "10px" }}>
                    <Navbar.Toggle
                      aria-controls="responsive-navbar-nav"
                    />
                  </div>
                  <Navbar.Collapse
                    id="responsive-navbar-nav menu-list-items"
                  //  style={{ justifyContent: "" }} 
                  >
                    <Nav className="nav-tag" >

                      <li className="nav-item dropdown"

                      >
                        <a

                          className="nav-link dropdown-toggle"
                          href="#" id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >
                          S S SCREWS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphillip",

                              }} state={"1"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              CSK PHILLIPS
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/panphillip",

                              }} state={"2"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              PAN PHILLIPS
                            </Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskslotted",

                              }} state={"3"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK SLOTTED
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/panslotted",

                              }} state={"4"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              PAN SLOTTED
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskslottedwood",

                              }} state={"5"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              CSK SLOTTED WOOD</Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphilipwood",

                              }} state={"6"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS WOOD
                            </Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/drywall410",

                              }} state={"7"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              DRYWALL 410
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/drywall410antique",

                              }} state={"33"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              DRYWALL 410 ANTIQUE
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/drywall410golden",

                              }} state={"34"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              DRYWALL 410 GOLDEN
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphilpsds410",

                              }} state={"8"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS SDS
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/panphilpsds410",

                              }} state={"9"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              PAN PHILLIPS SDS
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/hexheadsdsepdm410",

                              }} state={"10"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              HEX SDS EPDM 410
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/hexheadsdsmetalbondedepdm410",

                              }} state={"11"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              HEX SDS METAL BONDED EPDM 410
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphillipsantique",

                              }} state={"27"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS ANTIQUE
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphillipsrosegold",

                              }} state={"28"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS ROSEGOLD
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphillipsautoblackfinish",

                              }} state={"29"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS AUTO BLACK FINISH
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphillipsgolden",

                              }} state={"32"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS GOLDEN
                            </Link>
                          </li>
                        </ul>
                      </li>


                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >

                          CHIPBOARD SCREWS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          {/* <li>
                            <Link
                              to={{
                                pathname: "/cskphillipchipboard",

                              }} state={"12"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              CSK PHILLIPS CHIPBOARD</Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/omnicutchipboard",

                              }} state={"13"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              OMNI CUT CHIPBOARD
                            </Link></li> */}
                          <li>
                            <Link
                              to={{
                                pathname: "/fullcut410",

                              }} state={"14"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              FULLCUT 410
                            </Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/fullcut410antique",

                              }} state={"30"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              FULLCUT 410 ANTIQUE
                            </Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/fullcut410golden",

                              }} state={"35"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              FULLCUT 410 GOLDEN
                            </Link></li>

                        </ul>
                      </li>


                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >

                          MACHINE SCREWS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link
                              to={{
                                pathname: "/combiwithwashermachine",

                              }} state={"15"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              COMBINATION WITH WASHER S S
                            </Link></li>
                          <li><Link
                            to={{
                              pathname: "/machinebswthread",

                            }} state={"16"}
                            className="menu-Link "
                            style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                            CSK SLOTTED BSW THREAD
                          </Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/machinemmthread",

                              }} state={"17"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK SLOTTED MM THREAD
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/cskphillmachinemmthread",

                              }} state={"18"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              CSK PHILLIPS MM THREAD
                            </Link>
                          </li>

                        </ul>
                      </li>

                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >

                          M.S. SCREWS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link
                              to={{
                                pathname: "/zinkchipboard",

                              }} state={"19"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              ZINC CHIPBOARD
                            </Link></li>
                          <li><Link
                            to={{
                              pathname: "/blackgypsum",

                            }} state={"20"}
                            className="menu-Link "
                            style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                            BLACK GYPSUM
                          </Link></li>
                          <li>
                            <Link
                              to={{
                                pathname: "/chromefinish",

                              }} state={"21"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              WHITE CHROME FINISH
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                pathname: "/combinationwithwasherms",

                              }} state={"22"}
                              className="menu-Link "
                              style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                              COMBINATION WITH WASHER M.S.
                            </Link>
                          </li>

                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >

                          CARRIAGE BOLTS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link
                              to={{
                                pathname: "/carriagebolt12mm",

                              }} state={"23"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              CARRIAGE BOLTS 12 MM
                            </Link></li>
                          <li><Link
                            to={{
                              pathname: "/carriagebolt14mm",

                            }} state={"24"}
                            className="menu-Link "
                            style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                            CARRIAGE BOLTS 14 MM
                          </Link></li>

                        </ul>
                      </li>

                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >

                          KBS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link
                              to={{
                                pathname: "/kitchenbasketscrew",

                              }} state={"31"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              KITCHEN BASKET SCREW
                            </Link></li>
                        </ul>
                      </li>

                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                          style={{ color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}
                        >

                          NAILS
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li>
                            <Link
                              to={{
                                pathname: "/nailsheadless",

                              }} state={"25"}
                              className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }} data="LinkData">
                              NAILS HEADLESS
                            </Link></li>
                          <li><Link
                            to={{
                              pathname: "/nailroundhead",

                            }} state={"26"}
                            className="menu-Link "
                            style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500, paddingLeft: "5px" }}>
                            NAILS ROUND HEAD
                          </Link></li>

                        </ul>
                      </li>

                    </Nav>
                  </Navbar.Collapse>
                </>
                : ""}



              <Nav className=' navbar-Div1 menu-list-div mt-0 p-0 pt-1 justify-content-end m-0'>
                <div className="d-flex gap-2">

                  {/* {console.log("linkDataProps", linkDataProps)} */}

                  {(linkDataProps?.pathname == "/writemodemodal") ? "" :

                    // linkDataProps?.state == 1111
                    //   || 
                      (linkDataProps?.state == 1 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 2 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 3 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 4 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 5 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 6 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 7 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 8 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 9 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 10 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 11 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 12 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 13 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 14 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 15 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 16 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 17 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 18 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 19 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 20 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 21 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 22 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 23 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 24 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 25 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 26 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 27 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 28 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 29 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 30 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 31 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 32 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 33 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 34 && OrderTypemodeVariable == "OrderTypemode")
                      || (linkDataProps?.state == 35 && OrderTypemodeVariable == "OrderTypemode")

                      ? <div style={{ width: "20px" }}>
                        <Link 
                        to="/fourbox"
                        state={"1111"}
                        >
                          <img src="/backicon.png" className="img-fluid mt-1" style={{ cursor: "pointer" }} />
                        </Link>
                      
                      </div>
                      :
                      
                      linkDataProps?.pathname == "/fourbox" ? <>
                        <div style={{ width: "20px" }}>
                          <Link to="/writemodemodal">
                            <img src="/backicon.png" className="img-fluid mt-1" style={{ cursor: "pointer" }} />
                          </Link>
                          
                        </div>

                      </> :
                        <div style={{ width: "20px" }}>
                          <Link to="/fourbox"
                          state={"1111"}
                          >
                            <img src="/backicon.png" className="img-fluid mt-1" style={{ cursor: "pointer" }} />
                          </Link>
                        
                        </div>
                  }
                  {console.log("linkDataProps?.pathname", linkDataProps)}

                  <div className="d-flex justify-content-center align-items-center">
                    <h6 className="mt-1" style={{ cursor: "pointer" }} onClick={showFildeMemberFuction}>{UserRole.Email_Id}</h6>
                  </div>
                  <div className="d-flex justify-content-end " style={{ width: "22px" }} onClick={logoutFunction}>
                    <img src="/logoutcircle.svg" className="img-fluid" style={{ cursor: "pointer" }} />
                  </div>
                </div>

              </Nav>

            </Container>
            {/* <Navbar.Brand href="#">
              <Link to="#" style={{ textDecoration: "none", color: "white", fontSize: "9px", fontWeight: "600" }}>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div className="">
                    <img
                      src="./Omni-Logo-1.png"
                      style={{ width: "80px" }}
                    />
                  </div>
                </div>
              </Link>
            </Navbar.Brand>
            <Nav className=' navbar-Div1'>
              <div className="d-flex gap-2">
                <div className="d-flex justify-content-center align-items-center">
                  <h6 className="mt-1" style={{ cursor: "pointer" }} onClick={showFildeMemberFuction}>{UserRole.Email_Id}</h6>
                </div>

                <div className="d-flex justify-content-end " style={{ width: "30px" }} onClick={logoutFunction}>
                  <img src="logoutcircle.svg" className="img-fluid" style={{ cursor: "pointer" }} />
                </div>
              </div>

            </Nav> */}

          </Navbar>
        </>

        : <>
          <Navbar collapseOnSelect expand="lg"
            style={{ backgroundColor: "rgb(20, 14, 0)" }}
          >
            <Navbar.Brand href="#">
              <Link to="/" style={{ textDecoration: "none", color: "white", fontSize: "9px", fontWeight: "600" }}>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div className="">
                    <img
                      src="/Omni-Logo-2.png"
                      style={{ width: "80px" }}
                    />
                  </div>
                  <div>
                    <span >
                      SINCE 1992
                    </span>
                  </div>
                </div>

              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ backgroundColor: "white" }} />
            <Navbar.Collapse id="responsive-navbar-nav " className='navbar-Div' >
              <Nav className="" >
                <Nav.Link href="#">
                  <Link to="/" className="menu-Link">
                    HOME
                  </Link>
                </Nav.Link>
                {/* <Nav.Link href="#">
                  <Link to="/downladpage" className="menu-Link ">
                    SUPUR ADMIN
                  </Link>
                </Nav.Link> */}
                <Nav.Link href="#">
                  <Link to="/admincode" className="menu-Link ">
                    ADMIN
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/otpcode" className="menu-Link">
                    FIELD MEMBER
                  </Link>
                </Nav.Link>
                {/* <Nav.Link href="#">
                  <Link to="/contactus" className="menu-Link">
                    SCREWS VIDEO
                  </Link>
                </Nav.Link> */}
                {/* <Nav.Link href="#">
                  <Link to="/orderbyshopkeeper" className="menu-Link">
                    SHOPKEEPER
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/contactus" className="menu-Link">
                    CONTACT US
                  </Link>
                </Nav.Link> */}
                <Nav.Link href="#">
                  <Link to="/aboutus" className="menu-Link">
                    ABOUT US
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      }

    </div>
  );
};

export default Menubar;


