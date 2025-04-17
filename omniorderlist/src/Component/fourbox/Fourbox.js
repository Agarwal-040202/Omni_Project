import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./fourbox.css"
import { Col, Row, Input } from "antd";
import { useDispatch, useSelector } from "react-redux"
import Commonbackbutton from "../CommonButtons/Commonbackbutton";
import Commonbutton from "../CommonButtons/Commonbutton";
import ShopkeeperDetailModal from "../Shopkeepr Details/ShopkeeperDetailModal";
import PreOderDetailModal from "../Order Details/PreOderDetailModal";
import { getFiledMemberData } from "../../Redux/Slice/getFieldMemberDataSlice"
import MyContext from "../../MyContext";



const Fourbox = () => {
  const dispatch = useDispatch()
  const linkDataProps = useLocation();

  const UserRole = JSON.parse(sessionStorage.getItem("personalInfo")) || ""
  const UserID = sessionStorage.getItem("loggedUserId")
  const OrderTypemodeVariable = sessionStorage.getItem("OrderTypemode")
  const { fileldMemberDetailStatus, filedMemberRecored } = useSelector((state) => state.getFiledMemberData)

  // console.log('personalInjjjfo', fileldMemberDetailStatus, filedMemberRecored)

  // console.log("userrole", UserRole?.User_Role, UserID)

  console.log("OrderTypemodeVariable", OrderTypemodeVariable, linkDataProps?.state)

  const navigate = useNavigate();

  useEffect(() => {
    if (UserID != "") {
      dispatch(getFiledMemberData(UserID));
    }
    // sessionStorage.removeItem('OrderTypemode');
  }, [])

  const [showPreOrderDetailModal, setShowPreDetailModal] = useState(false)

  const takeNewOrderFunction = (e) => {
    setShowPreDetailModal(true)
  }

  return (
    <div className="bg-imgae">

      {showPreOrderDetailModal == true && <PreOderDetailModal showPreOrderDetailModal={showPreOrderDetailModal} setShowPreDetailModal={setShowPreDetailModal} />}

      <Row >
        <Col span={24}>
          <Row className="Main-Card-Layout-Div">
            {/* {linkDataProps?.state !== "1111" &&
              <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
                <div>
                  <Link className="linkstyles" to={fileldMemberDetailStatus == "Success" ? "/addshopkeeper" : "/addfieldmember"} >
                    <Card className="Main-Card-Div Animation-Card-Left Main-Card-Div-Left" >
                      <Card.Body className="d-flex justify-content-center align-items-center " >
                        <Card.Img src={fileldMemberDetailStatus == "Success" ? "shopkeepr1.png" : "fieldmember2.png"} style={{ zIndex: "1" }} className='w-50' />
                      </Card.Body>

                      {/* style={{backgroundColor:"white",borderBottomLeftRadius:"50px",borderBottomRightRadius:"50px"}} 
                      <Card.Header className="text-center" style={{ backgroundColor: "maroon", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }}>
                        {fileldMemberDetailStatus == "Success" ? "Add Shopkeeper" : "Add Field Member"}
                      </Card.Header>
                    </Card>
                  </Link>
                </div>
              </Col>
            } */}
            {/* {linkDataProps?.state !== "1111" &&
              <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
                <div>
                  <Link className="linkstyles" to="#" >
                    <Card className="Main-Card-Div Animation-Card-Top Main-Card-Div-Left" onClick={takeNewOrderFunction}>
                      <Card.Body className="d-flex justify-content-center align-items-center " >
                        <Card.Img src="takeorder1.webp" style={{ zIndex: "1", width: "75px" }} className='' />
                      </Card.Body>

                      {/* style={{backgroundColor:"white",borderBottomLeftRadius:"50px",borderBottomRightRadius:"50px"}} 
                      <Card.Header
                        className="text-center"
                        style={{ backgroundColor: "maroon", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }}
                      >
                        Take New Order
                      </Card.Header>
                    </Card>
                  </Link>
                </div>
              </Col>
            } */}
            {/* manual mode code  */}
            {linkDataProps?.state === "1111" &&
              <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
                <div>
                  <Link className="linkstyles"
                    state={"1111"}
                    to="/fourbox/pricelist"
                  >
                    <Card className="Main-Card-Div Animation-Card-Bottom Main-Card-Div-Left" >

                      <Card.Body className="d-flex justify-content-center align-items-center " >
                        <Card.Img src="dispalyorder1.png" style={{ zIndex: "1" }} className='w-50' />
                      </Card.Body>

                      <Card.Header className="text-center" style={{ backgroundColor: "maroon", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }}>
                        Take New Order</Card.Header>

                    </Card>
                  </Link>
                </div>
              </Col>
            }
            {linkDataProps?.state === "1111" &&
              <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
                <div>
                  <Link className="linkstyles" to="/editordertable" >
                    <Card className="Main-Card-Div Animation-Card-Right Main-Card-Div-Left" >
                      <Card.Body className="d-flex justify-content-center align-items-center " >
                        <Card.Img src="editorder1.webp" style={{ zIndex: "1" }} className='w-50' />
                      </Card.Body>

                      <Card.Header className="text-center" style={{ backgroundColor: "maroon", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }}>
                        Edit Old Order
                      </Card.Header>


                    </Card>
                  </Link>
                </div>
              </Col>
            }

            {linkDataProps?.state === "1111" &&
              <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} className="d-flex justify-content-center align-items-center">
                <div>
                  <Link className="linkstyles" to="/screwreportpage" >
                    <Card className="Main-Card-Div Animation-Card-Right Main-Card-Div-Left" >
                      <Card.Body className="d-flex justify-content-center align-items-center " >
                        <Card.Img src="quality-img.jpg" style={{ zIndex: "1" }} className='w-50' />
                      </Card.Body>

                      <Card.Header className="text-center" style={{ backgroundColor: "maroon", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }}>
                        Screw Report
                      </Card.Header>


                    </Card>
                  </Link>
                </div>
              </Col>
            }
            {/* manual mode code end */}

          </Row>
        </Col>
      </Row>

    </div>
  );
};

export default Fourbox;
