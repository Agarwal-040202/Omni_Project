// import { Col, Row } from 'antd'
// import React, { useEffect, useState } from 'react'
// import Form from 'react-bootstrap/Form'
// import { Table } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux"
// import { getShopkeeperData } from "../../Redux/Slice/getShopkeeperDataSlice"
// import "./shopkeepertabledetails.css"
// import ShopKeeperAddEdit from './ShopKeeperAddEdit'

// const ShopKeeperList = () => {
//     const { shopKeeperData } = useSelector((state) => state.getShopKeeperData)
//     const dispatch = useDispatch()

//     const [showAddEditModal, setShowAddEditModal] = useState(false)
//     const [getInput, setInput] = useState('');
//     const [actionType, setActionType] = useState('ADD')
//     const [editInfo, setEditInfo] = useState('')
//     console.log('editInfo', actionType, editInfo)

//     console.log("shopfdfdfkeeper", shopKeeperData)

//     useEffect(() => {
//         functionS()
//     }, [])
//     const functionS = () => {
//         try {
//             dispatch(getShopkeeperData());
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     const handleActions = (actionType, value) => {
//         console.log('valuevaluevalue', value)
//         setEditInfo(value)
//         setActionType(actionType)
//         setShowAddEditModal(true)
//     }

//     const searchData = (e) => {
//         setInput(e.target.value)

//       }
//       console.log("plpllplp", getInput)


//     return (
//         <>
//             <div className='p-3' >
//                 <Row>
//                     <Col span={24}>
//                         <Row>
//                             <Col> <div><h3 style={{ color: "maroon" }}>Shoopkeeper Details</h3></div></Col>
//                         </Row>
//                         <Row className='mt-2'>
//                             <Col span={14} xs={24} sm={14} md={14} lg={14} className="input-group Serach-Input-Box-Div">
//                                 {/* <input type="text" className="form-control" placeholder="Search for occurrences" />
//                                 <a href="#" style={{ backgroundColor: "#F4F6F6" }}><img className='' height={40} src="eventSearchIngIcon.svg" /></a> */}

//                                 <div className='search_input-div w-100'>
//                                     <div className='w-100'>
//                                         <Form.Control

//                                             size="md" type="text" placeholder="Search Size" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
//                                     </div>
//                                     <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
//                                         <img src="/searchicon2.png" className='w-75' />
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Col span={10} xs={24} sm={10} md={10} lg={10} className='button-submit-col'>
//                                 <div>
//                                     <Link to="/fourbox"> <button className='backbutton'>Back</button></Link>
//                                 </div>
//                                 <div className='m-0 p-0'>
//                                     <Link className="" to="#"  >
//                                         <div className="" > <button className="Add-shopkeeper-btn" type="submit" onClick={() => handleActions('ADD', "")}>  Add Shopkeeper</button></div>
//                                     </Link>
//                                 </div>

//                             </Col>
//                         </Row>
//                         <Row className='mt-3' style={{ maxHeight: "66vh", height: "90vh", overflow: "auto" }}>
//                             <Col>
//                                 {/* <h6 style={{ color: "maroon" }}>Shopkeeper Information </h6> */}
//                                 <Table bordered responsive >
//                                     <thead className='bg-light' >
//                                         <tr >
//                                             <th >Firm Name</th>
//                                             <th >Owner</th>
//                                             {/* <th >GST Number</th> */}
//                                             <th >Conatact</th>
//                                             {/* <th >Address</th> */}
//                                             <th >State</th>
//                                             <th >City</th>
//                                             {/* <th >Village Name</th> */}
//                                             <th >Action </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {shopKeeperData?.data !== undefined && shopKeeperData.data != '' && shopKeeperData?.data?.length > 0 && shopKeeperData?.data?.map((item, index) => {
//                                             const { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, GST_Number, Contact, Whatsup_Contact, Address1, City, State, Village_Street } = item
//                                             return (<>
//                                                 <tr>
//                                                     <td >{Firm_Name}</td>
//                                                     <td >{Shopkeeper_First_Name + " " + Shopkeeper_Last_Name}</td>
//                                                     {/* <td >{GST_Number}</td> */}
//                                                     <td >{Whatsup_Contact}</td>
//                                                     {/* <td >{Address1}</td> */}
//                                                     <td >{State}</td>
//                                                     <td >{City}</td>
//                                                     {/* <td >{Village_Street}</td> */}
//                                                     <td style={{ cursor: "pointer", color: "blue", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => handleActions('EDIT', item)} >Edit</td>

//                                                 </tr>
//                                             </>)
//                                         })}

//                                     </tbody>
//                                 </Table>

//                             </Col>
//                         </Row>


//                     </Col>
//                 </Row>

//                 <ShopKeeperAddEdit
//                     actionType={actionType}
//                     key={actionType}
//                     setShowAddEditModal={setShowAddEditModal}
//                     showAddEditModal={showAddEditModal}
//                     editInfo={editInfo}
//                     funForListCall={functionS}
//                 />
//             </div>
//         </>
//     )
// }

// export default ShopKeeperList

import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getShopkeeperData } from '../../Redux/Slice/getShopkeeperDataSlice';
import './shopkeepertabledetails.css';
import ShopKeeperAddEdit from './ShopKeeperAddEdit';

const ShopKeeperList = () => {
  const { shopKeeperData } = useSelector((state) => state.getShopKeeperData);
  const dispatch = useDispatch();

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [getInput, setInput] = useState('');
  const [actionType, setActionType] = useState('ADD');
  const [editInfo, setEditInfo] = useState('');

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

  const handleActions = (actionType, value) => {
    setEditInfo(value);
    setActionType(actionType);
    setShowAddEditModal(true);
  };

  const searchData = (e) => {
    setInput(e.target.value);
  };

  const filteredShopkeepers = shopKeeperData?.data?.filter((item) =>
    item.Firm_Name.toLowerCase().includes(getInput.toLowerCase())
  );

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
              <Col span={14} xs={24} sm={11} md={11} lg={14} className="input-group Serach-Input-Box-Div">
                <div className='search_input-div w-100'>
                  <div className='w-100'>
                    <Form.Control

                      size="md" type="text" placeholder="Search Firm Name" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
                  </div>
                  <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
                    <img src="/searchicon2.png" className='w-75' />
                  </div>
                </div>
              </Col>
              <Col span={10} xs={24} sm={13} md={13} lg={10} className='button-submit-col'>
                <div>
                  <Link to="/fourbox"> <button className='backbutton'>Back</button></Link>
                </div>
                <div className='m-0 p-0'>
                  <Link className="" to="#"  >
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
        {console.log("editInfo",editInfo)}
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
