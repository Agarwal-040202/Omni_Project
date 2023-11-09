import React, { useContext, useEffect, useState, } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MyContext from "../../MyContext";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import "../Navbar/menubar.css"
import { logoutUser } from "../../Redux/Slice/authSlice";
import { getFiledMemberData } from "../../Redux/Slice/getFieldMemberDataSlice"


const Menubar = () => {
  const dispatch = useDispatch()
  const linkDataProps = useLocation()

  const [fakeState,setFakeState] = useState(false)

  console.log("linkDataProps",linkDataProps?.pathname)
  const UserID = sessionStorage.getItem("loggedUserId")
  const UserRole = JSON.parse(sessionStorage.getItem("personalInfo")) || ""

  let { handleShopToast, setShowLoder } = useContext(MyContext)

  const { fileldMemberDetailStatus, filedMemberRecored } = useSelector((state) => state.getFiledMemberData)

  const navigate = useNavigate()

  const showFildeMemberFuction = () => {
    dispatch(getFiledMemberData(UserID));
    if (fileldMemberDetailStatus == "pending"){
      setShowLoder(true)

    }
    else if (fileldMemberDetailStatus == "Success"){
      navigate("/addfieldmember",
      
        {
          state: filedMemberRecored,
          
        }
      )
    }
    
  }

  const logoutFunction = ()=>{
    // dispatch(logoutUser(null))
    sessionStorage.clear();
    setShowLoder(true)

    setTimeout(()=>{
      handleShopToast(true, 'Success', 'Logout sucessfully.')
      navigate("/")

    },1000)


  }

  useEffect(()=>{
    
    setFakeState(!fakeState)
  },[linkDataProps])

  return (
    <div>
      {UserRole.User_Role == "Field Member" ?
       <>
          <Navbar 
           collapseOnSelect
           expand="lg"
           className="navbar-light"
           style={{backgroundColor: "white"}}
          >

          <Container fluid className="p-0">
          {/* <Link 
          to="/" style={{ textDecoration: "none",marginLeft:"10px" }}>
            <div className="ml-2">
              <img src="images/Omni-Logo-1.png" alt="" className="d-inline-block align-text-top w-50" />
            </div>
          </Link> */}
              <Link  style={{ textDecoration: "none", color: "white", fontSize: "9px", fontWeight: "600" }}>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div className="">
                    <img
                      src="./Omni-Logo-2.png"
                      style={{ width: "80px" }}
                    />
                  </div>
                  <div>
                    <span style={{color:"black",fontWeight:"bold"}}>
                      SINCE 1992
                    </span>
                  </div>
                </div>

              </Link>
              {console.log("hhhlhlhl",linkDataProps?.pathname)}
       {linkDataProps?.pathname == "/fourbox/pricelist" || linkDataProps?.pathname == "/fullcut" || linkDataProps?.pathname == "/drywall" || linkDataProps?.pathname == "/cskphillselftap" ?
       <>
       <div style={{marginRight:"10px"}}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav "  />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav menu-list-items " style={{ justifyContent: "" }} >
            <Nav className=" nav-tag">

            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          style={{color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600}}
          >

            S Steel 410
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>  
              <Link
                  to={{
                    pathname: "/fullcut",

                  }} state={"1"}
                  className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }} data="LinkData">
                    Fullcut 410 Chipboard</Link></li>
            <li><Link
                  to={{
                    pathname: "/drywall",

                  }} state={"2"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>Drywall 410</Link></li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    CSK Phillips SDS
                  </Link>
            </li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    Pan Phillips SDS
                    </Link>
            </li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    Hex SDS
                    </Link>
            </li>
          </ul>
        </li>

        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          style={{color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600}}
          >

            S Steel
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>  
              <Link
                  to={{
                    pathname: "/cskphillselftap",

                  }} state={"3"}
                  className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }} data="LinkData">
                    CSK Phillips Self Tapping</Link></li>
            <li><Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    CSK Phillips Self Tapping Wood
                    </Link></li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    CSK Phillips Chipboard
                  </Link>
            </li>
          </ul>
        </li>

        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          style={{color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600}}
          >

            Finsh Screw
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>  
              <Link
                  to={{
                    pathname: "/fullcut",

                  }} state={"0"}
                  className="menu-Link " style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }} data="LinkData">
                    Gypsum Chrome MS</Link></li>
            <li><Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    Black MS
                    </Link></li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    White Zink Fullcut MS
                  </Link>
            </li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    Antique SS
                    </Link>
            </li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    Rose Gold SS
                    </Link>
            </li>
            <li>
            <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", color: "black", fontFamily: "sans-serif", fontWeight: 500,paddingLeft:"5px" }}>
                    Brass SS
                    </Link>
            </li>
          </ul>
        </li>


              {/* <Nav.Link href="#features" className="menu-list-div mt-0 p-0 pt-1 justify-content-end m-0">
                <Link
                  to={{
                    pathname: "/fullcut",

                  }} state={"0"}
                  className="menu-Link " style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }} data="LinkData">Full Cut 410</Link>
                
              </Nav.Link>
              <Nav.Link href="#" className="menu-list-div mt-0 p-0 justify-content-end m-0">
                <Link
                  to={{
                    pathname: "/drywall",

                  }} state={"1"}
                  className="menu-Link "
                  style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>Drywall</Link>
              </Nav.Link>
              <Nav.Link href="#features" className="menu-list-div mt-0 p-0 justify-content-end m-0" >
                <Link to={{
                  pathname: "/cskphillips",

                }} state={"2"}
                  className="menu-Link" style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>CSK Phillips</Link>
              </Nav.Link>
              <Nav.Link href="#features" className="menu-list-div mt-0 p-0 justify-content-end m-0" >
                <Link to={{
                  pathname: "/cskslotted",

                }} state={"3"}
                  className="menu-Link" style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>CSK Slotted</Link>
              </Nav.Link>
              <Nav.Link href="#features" className="menu-list-div mt-0 p-0 justify-content-end m-0" >
                <Link to={{
                  pathname: "/panphillips",

                }} state={"4"}
                  className="menu-Link" style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>PAN Phillips</Link>
              </Nav.Link>
              <Nav.Link href="#features" className="menu-list-div mt-0 p-0 justify-content-end m-0" >
                <Link to={{
                  pathname: "/panslotted",

                }} state={"5"}
                  className="menu-Link" style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>PAN Slotted</Link>
              </Nav.Link>
              <Nav.Link href="#features" className="menu-list-div mt-0 p-0 justify-content-end m-0" >
                <Link to={{
                  pathname: "/woodphillips",

                }} state={"6"}
                  className="menu-Link " style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>Wood Phillips</Link>
              </Nav.Link>
              <Nav.Link href="#features" className="menu-list-div mt-0 p-0 justify-content-end m-0" >
                <Link to={{
                  pathname: "/woodslotted",

                }} state={"7"}
                  className="menu-Link" style={{ display: "block", width: "115px", color: "#6E2C00", fontFamily: "sans-serif", fontWeight: 600 }}>Wood Slotted</Link>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
       </>
       : ""}
          
         

          <Nav className=' navbar-Div1 menu-list-div mt-0 p-0 pt-1 justify-content-end m-0'>
              <div className="d-flex gap-2">
              {linkDataProps?.pathname == "/fourbox/pricelist" || linkDataProps?.pathname == "/fullcut" || linkDataProps?.pathname == "/drywall" ?  
                 <div>
                     <img src="notepad1.jpg" style={{width:"20px"}} />
                  </div> : ""}
                 

                <div className="d-flex justify-content-center align-items-center">
                  <h6 className="mt-1" style={{ cursor: "pointer" }} onClick={showFildeMemberFuction}>{UserRole.Email_Id}</h6>
                </div>
                <div className="d-flex justify-content-end " style={{ width: "30px" }} onClick={logoutFunction}>
                  <img src="logoutcircle.svg" className="img-fluid" style={{ cursor: "pointer" }} />
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
                      src="./Omni-Logo-2.png"
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
                <Nav.Link href="#">
                  <Link to="/orderbyshopkeeper" className="menu-Link">
                    SHOPKEEPER
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/contactus" className="menu-Link">
                    CONTACT US
                  </Link>
                </Nav.Link>
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


