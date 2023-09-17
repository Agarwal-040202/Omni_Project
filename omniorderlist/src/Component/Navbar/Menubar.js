import React, { useContext, } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MyContext from "../../MyContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import "../Navbar/menubar.css"
import { logoutUser } from "../../Redux/Slice/authSlice";
import { getFiledMemberData } from "../../Redux/Slice/getFieldMemberDataSlice"


const Menubar = () => {
  const dispatch = useDispatch()

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

  return (
    <div>
      {UserRole.User_Role == "Field Member" ?
       <>
          <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "white" }}>
            <Navbar.Brand href="#">
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
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ backgroundColor: "white" }} /> */}
            {/* <Navbar.Collapse id="responsive-navbar-nav "  > */}

            <Nav className=' navbar-Div1'>
              <div className="d-flex gap-2">
                <div className="d-flex justify-content-center align-items-center">
                  <h6 className="mt-1" style={{ cursor: "pointer" }} onClick={showFildeMemberFuction}>{UserRole.Email_Id}</h6>
                </div>

                <div className="d-flex justify-content-end " style={{ width: "30px" }} onClick={logoutFunction}>
                  <img src="logoutcircle.svg" className="img-fluid" style={{ cursor: "pointer" }} />
                </div>
              </div>

            </Nav>
            {/* </Navbar.Collapse> */}
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
                <Nav.Link href="#">
                  <Link to="/downladpage" className="menu-Link ">
                    SUPUR ADMIN
                  </Link>
                </Nav.Link>
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
                  <Link to="/reactjs" className="menu-Link">
                    SHOPKEEPER
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/contactus" className="menu-Link">
                    CONTACT US
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/contactus" className="menu-Link">
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


