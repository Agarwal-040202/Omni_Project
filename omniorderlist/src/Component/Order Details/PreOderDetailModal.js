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

const PreOderDetailModal = (props) => {
  const dispatch = useDispatch();

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
  const [showCommonComponent,setShowCommonComponent] = useState(false)

  console.log("koikoioioi",latitude,longitude)

  

  useEffect(() => {
    functionS();
  }, []);

  const functionS = () => {
    try {
      dispatch(getShopkeeperData());
    } catch (err) {
      console.log(err);
    }
  };

  console.log("shopKeeperData",selectedShopkeeper);
  const serializedData = JSON.stringify(selectedShopkeeper);
sessionStorage.setItem('shopKeeperData', serializedData);

  sessionStorage.setItem('shopKeeperData', serializedData);

  const [name, setName] = useState("");
  // search shopkeeper code start

  useEffect(() => {
    // Filter shopkeepers based on selected state
    if (address?.state) {
      const filteredData = shopKeeperData?.data?.filter(
        (item) => (item.State === address?.state && item.City === address?.city) 
      );
      console.log("filteredData", filteredData);
      setFilteredShopkeepers(filteredData);
    } else {
      // If no state is selected, show all shopkeepers
      setFilteredShopkeepers(shopKeeperData?.data);
    }
  }, [address?.state, shopKeeperData]);

  console.log("jlkjkjl", filteredShopkeepers);

  // Function to handle change in the Select component
  const onChange = (value) => {
    setSelectedValue(value);

    const result = filteredShopkeepers?.find((item) => {
      return (
        item.Firm_Name === value &&
        item.State === address?.state &&
        item.City === address?.city
        // item.State === "Haryana" &&
        // item.City === "Panipat1"
      );
    });

    setSelectedShopkeeper(result);
  };

  useEffect(() => {
    if (selectedShopkeeper) {
      setShowButton(false);
    }
  }, [selectedShopkeeper]);

  console.log("selectedValue", selectedValue, selectedShopkeeper);

  // search shopekeeper code end

  // new code start


  // new code

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);
  //   let { formattedAddress, country, state, city, pincode} = jsonAddress;

  const fetchAddress = (latitude, longitude) => {
    // Replace 'YOUR_API_KEY' with your Google Maps Geocoding API key
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          const addressData = response.data.results[0];

          // Extract meaningful address components
          const jsonAddress = {
            formattedAddress: addressData.formatted_address,
            city: extractComponent(addressData, "locality"),
            state: extractComponent(addressData, "administrative_area_level_1"),
            zipCode: extractComponent(addressData, "postal_code"),
            country: extractComponent(addressData, "country"),
          };

          // Log the JSON address data
          console.log("Address Data (JSON):", jsonAddress);

          // Set the address in state or do further processing as needed
          setAddress(jsonAddress);
        } else {
          setAddress("Address not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
        setLoading(false);
      });
  };

  // Helper function to extract specific component from addressData
  const extractComponent = (addressData, componentType) => {
    const component = addressData.address_components.find((component) =>
      component.types.includes(componentType)
    );
    return component ? component.long_name : "";
  };

  console.log("lkkhkjhkwwwjiit", address?.formattedAddress);

  const handleChange = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClose = () => {
    props.setShowPreDetailModal(false);
  };

  const showShopkeeperModal = () => {
    setShowModal(true);
  };

  console.log("jkjkdfdfdkkj", props.showPreOrderDetailModal);

  const callCommonComponentFunction = () =>{
    setShowCommonComponent(true)
  }

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
                              Filed Member Current Location
                            </h6>
                          </div>

                          <Row>
                            <Col span={24} className="w-100">
                              <Input
                                type="text"
                                placeholder="Enter Pramry Address"
                                name="address"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-textbox"
                                value={address?.formattedAddress}
                                disabled={true}
                                style={{ color: "black" }}
                              />
                            </Col>
                          </Row>

                          <Row span={24} className="">
                            <Col span={12} xs={24} sm={24} md={12} lg={12}>
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
                                placeholder="State"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-texbox2"
                                disabled={true}
                                value={address?.state}
                                style={{ color: "black" }}
                              />
                            </Col>
                          </Row>
                          <Row span={24} className="">
                            <Col span={12} xs={24} sm={24} md={12} lg={12}>
                              <Input
                                type="text"
                                placeholder="City"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-texbox3"
                                disabled={true}
                                value={address?.city}
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
                                placeholder="Pincode"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-texbox5"
                                disabled={true}
                                value={address?.zipCode}
                                style={{ color: "black" }}
                              />
                            </Col>
                          </Row>
                          {/* <Row>
                            <Col span={24} className="w-100">
                              <Input
                                type="text"
                                placeholder="Enter the Village or Street Adress"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-textbox6"
                              />
                            </Col>
                          </Row> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} lg={24} className="form-control mt-2">
                          <div>
                            <h6 className="info-tag-h6">Shopkeeper Detail</h6>
                          </div>
                          {console.log("jkljhlhh",filteredShopkeepers, shopKeeperData?.data)}
                          <Row>
                            <Col span={24} xs={24} sm={24} md={24} lg={24}>
                              <Select
                                placeholder="Search a Firm Name"
                                onChange={onChange}
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

                              {/* <Input
                                type="text"
                                placeholder="Enter Firm Name"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                // className='personal-ingo-textbox'
                                
                                style={{
                                  marginBottom: "10px",
                                  height: "36px",
                                  borderRadius: "5px",
                                }}
                              /> */}
                            </Col>
                            {/* <Col
                              xs={24}
                              sm={6}
                              md={6}
                              lg={6}
                              className=" w-100"
                            >
                              <div className="w-100 add-shopkeeper-button-col">
                                <button
                                  type="submit"
                                  className="addshopkeeperbutton"
                                  onClick={showShopkeeperModal}
                                >
                                  Add Shopkeeper
                                </button>
                              </div>
                            </Col> */}
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
                            <Col span={12} xs={24} sm={24} md={12} lg={12}>
                              <Input
                                type="text"
                                placeholder="GST Number"
                                name="company_n"
                                autoComplete="off"
                                onChange={handleChange}
                                value={selectedShopkeeper?.GST_Number}
                                className="personal-ingo-textbox7"
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
                                placeholder="Whatsup Conatct"
                                autoComplete="off"
                                onChange={handleChange}
                                value={selectedShopkeeper?.Whatsup_Contact}
                                className="personal-ingo-textbox8"
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
                            backbuttonwidth={102}
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
                                state: { stateData: "lkhl" },
                              }}
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
