import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Commonbackbutton from "../CommonButtons/Commonbackbutton";
import Commonbutton from "../CommonButtons/Commonbutton";
import { Col, Row, Input, Select, Space, Form } from "antd";
import "./preorderdetailmodal.css";
import ShopkeeperDetailModal from "../Shopkeepr Details/ShopkeeperDetailModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getShopkeeperData } from "../../Redux/Slice/getShopkeeperDataSlice";
import Commoncomponent from "../Pricelistwithorder/CommonComponent/Commoncomponent";
import { indianStates } from '../StateandCity/State';
import { citiesByState } from "../StateandCity/City";

const PreOderDetailModal = (props) => {
  const dispatch = useDispatch();
  const allStateNames = Object.values(indianStates);
  const { shopKeeperData } = useSelector((State) => State.getShopKeeperData);
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredShopkeepers, setFilteredShopkeepers] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [showCommonComponent, setShowCommonComponent] = useState(false)

  useEffect(() => {
    functionS();
  }, []);

  const functionS = () => {
    try {
      dispatch(getShopkeeperData());
    } catch (err) {
      // console.log(err);
    }
  };

  const serializedData = JSON.stringify(selectedShopkeeper);
  sessionStorage.setItem('shopKeeperData', serializedData);

  sessionStorage.setItem('shopKeeperData', serializedData);

  const [name, setName] = useState("");
  // search shopkeeper code start
  const onChangeFirmFunction = (value) => {
    setSelectedValue(value);

    const result = filteredShopkeepers?.find((item) => {
      return (
        item.Firm_Name === value &&
        item.State === indiaState &&
        item.City === selectedCity
      );
    });

    setSelectedShopkeeper(result);
  };

  useEffect(() => {
    if (selectedShopkeeper) {
      setShowButton(false);
    }
  }, [selectedShopkeeper]);

  // search shopekeeper code end

  // useEffect(() => {
  //   // Check if geolocation is supported by the browser
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLatitude(latitude);
  //         setLongitude(longitude);
  //         fetchAddress(latitude, longitude);
  //       },
  //       (error) => {
  //         // console.error("Error getting location:", error);
  //         setLoading(false);
  //       }
  //     );
  //   } else {
  //     // console.error("Geolocation is not supported by this browser.");
  //     setLoading(false);
  //   }
  // }, []);

  // find the state name code

  const [indiaState, setIndiaState] = useState('');
  const [cities, setCities] = useState([]);

  const handleStateChange = (state) => {
    setIndiaState(state);
  };

  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (event) => {
    setSelectedCity(event);
    if (event) {
      const filteredData = shopKeeperData?.data?.filter(
        (item) => (item.State === indiaState && item.City === event)
      );
      // console.log("filteredData", filteredData);
      setFilteredShopkeepers(filteredData);
    } else {
      // If no state is selected, show all shopkeepers
      setFilteredShopkeepers(shopKeeperData?.data);
    }
  };

  // const apiKey = "AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI"; // Replace with your API key
 
  // end the state name code

  // const fetchAddress = (latitude, longitude) => {
  //   // Replace 'YOUR_API_KEY' with your Google Maps Geocoding API key
  //   const apiKey = "YOUR_API_KEY";
  //   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI"}`;

  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       if (response.data.results.length > 0) {
  //         const addressData = response.data.results[0];

  //         // Extract meaningful address components
  //         const jsonAddress = {
  //           formattedAddress: addressData.formatted_address,
  //           city: extractComponent(addressData, "locality"),
  //           state: extractComponent(addressData, "administrative_area_level_1"),
  //           zipCode: extractComponent(addressData, "postal_code"),
  //           country: extractComponent(addressData, "country"),
  //         };

  //         setAddress(jsonAddress);
  //       } else {
  //         setAddress("Address not found");
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       // console.error("Error fetching address:", error);
  //       setAddress("Error fetching address");
  //       setLoading(false);
  //     });
  // };

  // Helper function to extract specific component from addressData
  // const extractComponent = (addressData, componentType) => {
  //   const component = addressData.address_components.find((component) =>
  //     component.types.includes(componentType)
  //   );
  //   return component ? component.long_name : "";
  // };


  const handleChange = () => { };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClose = () => {
    props.setShowPreDetailModal(false);
  };

  const showShopkeeperModal = () => {
    setShowModal(true);
  };


  const callCommonComponentFunction = () => {
    setShowCommonComponent(true)
  }

  useEffect(() => {
    setIndiaState(address?.state)
  }, [address?.state])


  return (
    <div>
      <Modal
        show={props.showPreOrderDetailModal}
        onHide={handleClose}
        centered
        backdrop={false}
        size="lg"
        style={{ zIndex: 9 }}
      >
        <Modal.Header
          closeButton
          closeVariant={"white"}
          style={{ backgroundColor: "maroon" }}
        >
          <Modal.Title style={{ color: "white" }}>Pre Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" mb-1">
            <Row className="d-flex justify-content-center">
              <Col
                span={24}
                xs={24}
                sm={24}
                md={24}
                lg={24}
                className="form-control"
              >
                <form onSubmit={handleSubmit}>
                  <Row className="">
                    <Col spn={24} lg={24} className=" w-100">
                      <Row>
                        <Col span={24} className="form-control  w-100">
                          <div>
                            <h6 className="info-tag-h6">
                              {/* Filed Member Current Location */}
                              Select State
                            </h6>
                          </div>

                         
                          <Row span={24} className="">
                            {/* <Col span={12} xs={24} sm={24} md={12} lg={12}>
                              <Input
                                type="text"
                                placeholder="Country"
                                name="country"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-texbox2"
                                disabled={true}
                                value={address?.country}
                                style={{ color: "black" }}
                              />
                            </Col> */}
                            <Col
                              span={12}
                              xs={24}
                              sm={24}
                              md={12}
                              lg={12}
                              className="d-flex justify-content-end"
                            >
                              <Select
                                placeholder="Select a State"
                                onChange={(e) => handleStateChange(e)}
                                value={ indiaState || null }
                                showSearch
                                style={{
                                  width: "100%",
                                  marginBottom: "10px",
                                  height: "36px",
                                  borderRadius: "5px",
                                }}
                              >
                                {allStateNames?.map((state, index) => (
                                  <Select.Option key={index} value={state}>
                                    {state}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Col>

                            <Col span={12} xs={24} sm={24} md={12} lg={12}>
                            {/* {indiaState && ( */}
                                <div>
                                  <Select onChange={handleCityChange}
                                    placeholder="Select a City"
                                    defaultValue={selectedCity || null}
                                    showSearch
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                      height: "36px",
                                      borderRadius: "5px",
                                      // marginLeft:"5px"
                                    }}
                                    className="mx-lg-1 mx-md-1"
                                    >
                                    {citiesByState[indiaState]?.map((city, index) => (
                                      <Select.Option key={index} value={city}>
                                        {city}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </div>
                              {/* )} */}
                              
                            </Col>
                          </Row>
                          <Row span={24} className="">
                            <Col span={12} xs={24} sm={24} md={12} lg={12}>
                            {/* {indiaState && ( */}
                                {/* <div>
                                  <Select onChange={handleCityChange}
                                    placeholder="Select a City"
                                    defaultValue={selectedCity || null}
                                    showSearch
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                      height: "36px",
                                      borderRadius: "5px",
                                    }}
                                    >
                                    {citiesByState[indiaState]?.map((city, index) => (
                                      <Select.Option key={index} value={city}>
                                        {city}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </div> */}
                              {/* )} */}
                              
                            </Col>
                            
                          </Row>
                          
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} lg={24} className="form-control mt-2">
                          <div>
                            <h6 className="info-tag-h6">Shopkeeper Detail</h6>
                          </div>
                          {/* {console.log("Shopkeeper Detail", filteredShopkeepers, shopKeeperData?.data)} */}
                          <Row>
                            <Col span={24} xs={24} sm={24} md={24} lg={24}>
                              <Select
                                placeholder="Search a Firm Name"
                                onChange={onChangeFirmFunction}
                                value={selectedValue || null}
                                showSearch
                                listHeight={90}
                                filterOption={(inputValue, option) =>
                                  option.children
                                    ?.toLowerCase()
                                    .indexOf(inputValue?.toLowerCase()) >= 0
                                }
                                style={{
                                  width: "100%",
                                  marginBottom: "10px",
                                  height: "36px",
                                  borderRadius: "5px",
                                }}
                              >
                                {filteredShopkeepers?.map((item) => (
                                  <Select.Option
                                    key={item.ID}
                                    value={item.Firm_Name}
                                  >
                                    {item.Firm_Name}
                                  </Select.Option>
                                ))}
                              </Select>

                              
                            </Col>
                           
                          </Row>
                          <Row span={24} className="">
                            <Col span={12} xs={24} sm={24} md={12} lg={12}>
                              <Input
                                type="text"
                                placeholder="First Name"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                className="personal-ingo-textbox"
                                value={
                                  selectedShopkeeper?.Shopkeeper_First_Name
                                }
                                disabled={true}
                                style={{ color: "black" }}
                              />
                            </Col>
                            <Col
                              span={12}
                              xs={24}
                              sm={24}
                              md={12}
                              lg={12}
                              className="d-flex justify-content-end"
                            >
                              <Input
                                type="text"
                                placeholder="Last Name"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                value={selectedShopkeeper?.Shopkeeper_Last_Name}
                                className="personal-ingo-textbox"
                                disabled={true}
                                style={{ color: "black" }}
                              />
                            </Col>
                          </Row>

                          <Row span={24} className="">
                           
                            <Col
                              span={12}
                              xs={24}
                              sm={24}
                              md={12}
                              lg={12}
                              className="d-flex justify-content-end"
                            >
                              <Input
                                type="text"
                                placeholder="Whatsup Conatct"
                                autoComplete="off"
                                onChange={handleChange}
                                value={selectedShopkeeper?.Whatsup_Contact}
                                // className="personal-ingo-textbox8"
                                disabled={true}
                                style={{ color: "black" }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col span={24} className="d-flex justify-content-between">
                      <div>
                        <Link to="#" onClick={handleClose}>
                          {/* <Button style={{ backgroundColor: "maroon" }}>Back</Button> */}
                          <Commonbackbutton
                            backButtonText={"Cancel"}
                            backbuttonwidth={86}
                          />
                        </Link>
                      </div>
                      <div>
                        <div>
                          {/* <Commonbutton buttonText={"Save"} buttonwidth={135} /> */}

                          <Button
                            type="submit"
                            style={{
                              backgroundColor: "maroon",
                              width: "106px",
                              border: "none",
                              height: "40px",
                            }}
                            disabled={showButton}
                            onClick={callCommonComponentFunction}
                          >

                            <Link
                              to={{
                                pathname: "pricelist",
                                // state: { stateData: "lkhl" },
                              }}state={"1"}
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Take Order
                            </Link>
                          </Button>
                        </div>
                        {/* <Commonbutton buttonText={"Save"} buttonwidth={135} /> */}
                        {/* <Button style={{ backgroundColor: "maroon" }}>Save</Button> */}
                      </div>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>

      {showModal == true && (
        <ShopkeeperDetailModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

    </div>
  );
};

export default PreOderDetailModal;
