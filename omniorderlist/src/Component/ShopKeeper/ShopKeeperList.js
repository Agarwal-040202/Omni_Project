// import { Col, Row, Select } from 'antd';
// import React, { useEffect, useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import { Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getShopkeeperData } from '../../Redux/Slice/getShopkeeperDataSlice';
// import './shopkeepertabledetails.css';
// import ShopKeeperAddEdit from './ShopKeeperAddEdit';
// import { indianStates } from '../StateandCity/State';
// import { citiesByState } from "../StateandCity/City";
// import axios from "axios";

// const ShopKeeperList = () => {

//   const allStateNames = Object.values(indianStates);
//   const allCityByState = Object.values(citiesByState);

//   const { shopKeeperData } = useSelector((state) => state.getShopKeeperData);
//   const dispatch = useDispatch();

//   const [showAddEditModal, setShowAddEditModal] = useState(false);
//   const [getInput, setInput] = useState('');
//   const [actionType, setActionType] = useState('ADD');
//   const [editInfo, setEditInfo] = useState('');
//   const [indiaState, setIndiaState] = useState('');
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [filteredShopkeepers, setFilteredShopkeepers] = useState([]);

//   console.log("allStateNames", allCityByState)

//   useEffect(() => {
//     functionS();
//   }, []);

//   const functionS = () => {
//     try {
//       dispatch(getShopkeeperData());
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleActions = (actionType, value) => {
//     setEditInfo(value);
//     setActionType(actionType);
//     setShowAddEditModal(true);
//   };

//   // const [filteredShopkeepers, setFilteredShopkeepers] = useState([])
//   useEffect(() => {
//     // Check if geolocation is supported by the browser
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setLongitude(longitude);
//           fetchAddress(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           setLoading(false);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setLoading(false);
//     }
//   }, []);

//   const fetchAddress = (latitude, longitude) => {
//     // Replace 'YOUR_API_KEY' with your Google Maps Geocoding API key
//     const apiKey = "YOUR_API_KEY";
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI"}`;

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         if (response.data.results.length > 0) {
//           const addressData = response.data.results[0];

//           // Extract meaningful address components
//           const jsonAddress = {
//             formattedAddress: addressData.formatted_address,
//             city: extractComponent(addressData, "locality"),
//             state: extractComponent(addressData, "administrative_area_level_1"),
//             zipCode: extractComponent(addressData, "postal_code"),
//             country: extractComponent(addressData, "country"),
//           };

//           // Log the JSON address data
//           console.log("Address Data (JSON):", jsonAddress);

//           // Set the address in state or do further processing as needed
//           setAddress(jsonAddress);
//         } else {
//           setAddress("Address not found");
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching address:", error);
//         setAddress("Error fetching address");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     setIndiaState(address?.state)
//   }, [address?.state])

//   useEffect(() => {
//     if (shopKeeperData?.data) {
//       filterShopkeepers(indiaState, selectedCity);
//     }
//   }, [shopKeeperData?.data, indiaState, selectedCity]);

//   // Helper function to extract specific component from addressData
//   const extractComponent = (addressData, componentType) => {
//     const component = addressData.address_components.find((component) =>
//       component.types.includes(componentType)
//     );
//     return component ? component.long_name : "";
//   };

//   console.log("ghhghkjhk", address?.state);

//   const searchData = (e) => {
//     setInput(e.target.value);

//   };


//   // const filteredShopkeepers = shopKeeperData?.data?.filter((item) =>
//   //   item.Firm_Name.toLowerCase().includes(getInput.toLowerCase())
//   // );

// console.log("filteredShopkeepers",filteredShopkeepers)

//   const handleStateChange = (state) => {
//     setIndiaState(state);
//   };

//   const handleCityChange = (event) => {
//     setSelectedCity(event);
//     if (shopKeeperData?.data) {
//       const filteredShopkeepers = shopKeeperData?.data?.filter(
//         (item) => (item.State === indiaState && item.City === event)
//       );
//       console.log("filteredData", filteredShopkeepers);
//       // setFilteredShopkeepers(filteredData);
//     } else {
//       // If no state is selected, show all shopkeepers
//       // setFilteredShopkeepers(shopKeeperData?.data);
//     }
//   };

//   return (
//     <>
//       <div className="p-3">
//         <Row>
//           <Col span={24}>
//             <Row>
//               <Col>
//                 <div>
//                   <h3 style={{ color: 'maroon' }}>Shopkeeper Details</h3>
//                 </div>


//               </Col>
//             </Row>
//             <Row className="mt-2">
//               {/* <Col span={7} xs={24} sm={11} md={11} lg={7} className="input-group Serach-Input-Box-Div" style={{ border: "1px solid red" }}>
//                 <div className='search_input-div w-100'>
//                   <div className='w-100'>
//                     <Form.Control

//                       size="md" type="text" placeholder="Search Firm Name" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
//                   </div>
//                   <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
//                     <img src="/searchicon2.png" className='w-75' />
//                   </div>
//                 </div>
//               </Col> */}

//               <Col span={3} xs={24} sm={11} md={11} lg={3}>
//                 <Select
//                   placeholder="Select a State"
//                   onChange={(e) => handleStateChange(e)}
//                   value={indiaState || null}
//                   style={{
//                     width: "100%",
//                     marginBottom: "10px",
//                     height: "36px",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   {allStateNames?.map((state, index) => (
//                     <Select.Option key={index} value={state}>
//                       {state}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Col>

//               <Col span={3} xs={24} sm={11} md={11} lg={3}>

//                   <div>
//                     {/* <label>Select a City:</label> */}
//                     <Select onChange={handleCityChange}
//                       placeholder="Select a City"
//                       defaultValue={selectedCity || null}
//                       showSearch
//                       style={{
//                         width: "100%",
//                         marginBottom: "10px",
//                         height: "36px",
//                         borderRadius: "5px",
//                       }}
//                     >
//                       {/* <option value={null}>Select City</option> */}
//                       {citiesByState[indiaState]?.map((city, index) => (
//                         <Select.Option key={index} value={city}>
//                           {city}
//                         </Select.Option>
//                       ))}
//                     </Select>
//                   </div>

//               </Col>

//               <Col span={10} xs={24} sm={13} md={13} lg={10} className='button-submit-col'>
//                 <div>
//                   <Link to="/fourbox"> <button className='backbutton'>Back</button></Link>
//                 </div>
//                 <div className='m-0 p-0'>
//                   <Link className="" to="#"  >
//                     <div className="" > <button className="Add-shopkeeper-btn" type="submit" onClick={() => handleActions('ADD', "")}>  Add Shopkeeper</button></div>
//                   </Link>
//                 </div>

//               </Col>
//             </Row>
//             <Row className="mt-3" style={{ maxHeight: '66vh', height: '90vh', overflow: 'auto' }}>
//               <Col>
//                 <Table bordered responsive>
//                   <thead className="bg-light">
//                     <tr>
//                       <th>Firm Name</th>
//                       <th>Owner</th>
//                       <th>Contact</th>
//                       <th>State</th>
//                       <th>City</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredShopkeepers?.length > 0 &&
//                       filteredShopkeepers.map((item, index) => {
//                         const { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, Whatsup_Contact, State, City } = item;
//                         return (
//                           <tr key={index}>
//                             <td>{Firm_Name}</td>
//                             <td>{Shopkeeper_First_Name + ' ' + Shopkeeper_Last_Name}</td>
//                             <td>{Whatsup_Contact}</td>
//                             <td>{State}</td>
//                             <td>{City}</td>
//                             <td
//                               style={{ cursor: 'pointer', color: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//                               onClick={() => handleActions('EDIT', item)}
//                             >
//                               Edit
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//         {console.log("editInfo", editInfo)}
//         <ShopKeeperAddEdit
//           actionType={actionType}
//           key={actionType}
//           setShowAddEditModal={setShowAddEditModal}
//           showAddEditModal={showAddEditModal}
//           editInfo={editInfo}
//           funForListCall={functionS}
//         />
//       </div>
//     </>
//   );
// };

// export default ShopKeeperList;


import { Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getShopkeeperData } from '../../Redux/Slice/getShopkeeperDataSlice';
import './shopkeepertabledetails.css';
import ShopKeeperAddEdit from './ShopKeeperAddEdit';
import { indianStates } from '../StateandCity/State';
import { citiesByState } from "../StateandCity/City";
import axios from "axios";

const ShopKeeperList = () => {
  const allStateNames = Object.values(indianStates);

  const { shopKeeperData } = useSelector((state) => state.getShopKeeperData);
  const dispatch = useDispatch();

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [getInput, setInput] = useState('');
  const [actionType, setActionType] = useState('ADD');
  const [editInfo, setEditInfo] = useState('');
  const [indiaState, setIndiaState] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState([]);
  const [filteredShopkeepers, setFilteredShopkeepers] = useState([]);

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

  // const filterShopkeepers = (state, city) => {
  //   if (state && city) {
  //     const filteredData = shopKeeperData?.data.filter(
  //       (item) => item.State === state && item.City === city
  //     );
  //     setFilteredShopkeepers(filteredData);
  //   } else {
      
  //     setFilteredShopkeepers(shopKeeperData?.data.filter(
  //       (item)=>item.State === state));
  //   }
  // };

  const filterShopkeepers = (state, city) => {
    if (state && city) {
      const filteredData = shopKeeperData?.data?.filter(
        (item) => item.State === state && item.City === city
      );
      setFilteredShopkeepers(filteredData);
    } else if (state) {
      const filteredData = shopKeeperData?.data?.filter(
        (item) => item.State === state
      );
      setFilteredShopkeepers(filteredData);
    } else {
      // If neither state nor city is provided, set filtered data to the entire dataset
      setFilteredShopkeepers(shopKeeperData?.data);
    }
  };
  

  useEffect(() => {
    if (shopKeeperData?.data) {
      filterShopkeepers(indiaState, selectedCity);
    }
  }, [shopKeeperData?.data, indiaState, selectedCity]);

  useEffect(() => {
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

  const fetchAddress = (latitude, longitude) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI"}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          const addressData = response.data.results[0];
          const jsonAddress = {
            formattedAddress: addressData.formatted_address,
            city: extractComponent(addressData, "locality"),
            state: extractComponent(addressData, "administrative_area_level_1"),
            zipCode: extractComponent(addressData, "postal_code"),
            country: extractComponent(addressData, "country"),
          };
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

  useEffect(() => {
    setIndiaState(address?.state)
  }, [address?.state]);

  const extractComponent = (addressData, componentType) => {
    const component = addressData.address_components.find((component) =>
      component.types.includes(componentType)
    );
    return component ? component.long_name : "";
  };

  console.log("ghhghjhjhhkjhk", address?.state);

  const searchData = (e) => {
    setInput(e.target.value);
  };

  const handleStateChange = (state) => {
    setIndiaState(state);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event);
    if (shopKeeperData?.data) {
      filterShopkeepers(indiaState, event);
    }
  };

  const handleActions = (actionType, value) => {
    setEditInfo(value);
    setActionType(actionType);
    setShowAddEditModal(true);
  };

  return (
    <>
      <div className="p-3">
        <Row>
          <Col span={24}>
            <Row>
              <Col>
                <div>
                  <h3 style={{ color: 'maroon' }}>Shopkeeper Details</h3>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
                          <Col span={6} xs={24} sm={6} md={6} lg={6}>
                <Select
                  placeholder="Select a State"
                  onChange={(e) => handleStateChange(e)}
                  value={indiaState || null}
                  showSearch
                  style={{
                    width: "100%",
                    marginBottom: "5px",
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
              
              <Col span={6} xs={24} sm={6} md={6} lg={6}>
                <Select
                  onChange={handleCityChange}
                  placeholder="Select a City"
                  defaultValue={selectedCity || null}
                  showSearch
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                  }}
                  className='citySelect'
                >
                  {citiesByState[indiaState]?.map((city, index) => (
                    <Select.Option key={index} value={city}>
                      {city}
                    </Select.Option>
                  ))}
                </Select>
              </Col>

              <Col span={10} xs={24} sm={12} md={12} lg={12} className='button-submit-col'>
                <div>
                  <Link to="/fourbox"> <button className='backbutton'>Back</button></Link>
                </div>
                <div className='m-0 p-0'>
                  <Link className="" to="#">
                    <div className="" > <button className="Add-shopkeeper-btn" type="submit" onClick={() => handleActions('ADD', "")}>  Add Shopkeeper</button></div>
                  </Link>
                </div>
              </Col>
            </Row>
            <Row className="mt-3" style={{ maxHeight: '66vh', height: '90vh', overflow: 'auto' }}>
              <Col>
                <Table bordered responsive>
                  <thead className="bg-light">
                    <tr>
                      <th>Firm Name</th>
                      <th>Owner</th>
                      <th>Contact</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShopkeepers?.length > 0 &&
                      filteredShopkeepers.map((item, index) => {
                        const { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, Whatsup_Contact, State, City } = item;
                        return (
                          <tr key={index}>
                            <td>{Firm_Name}</td>
                            <td>{Shopkeeper_First_Name + ' ' + Shopkeeper_Last_Name}</td>
                            <td>{Whatsup_Contact}</td>
                            <td>{State}</td>
                            <td>{City}</td>
                            <td
                              style={{ cursor: 'pointer', color: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                              onClick={() => handleActions('EDIT', item)}
                            >
                              Edit
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
        {console.log("editInfo", editInfo)}
        <ShopKeeperAddEdit
          actionType={actionType}
          key={actionType}
          setShowAddEditModal={setShowAddEditModal}
          showAddEditModal={showAddEditModal}
          editInfo={editInfo}
          funForListCall={functionS}
        />
      </div>
    </>
  );
};

export default ShopKeeperList;

