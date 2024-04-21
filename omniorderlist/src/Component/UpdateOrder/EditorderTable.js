import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderListData } from '../../Redux/Slice/orderListSlice/getOderlistDataSlice';
import { Col, Row, Select } from 'antd';
import { Table } from 'react-bootstrap';
import EditOrderModal from './EditOrderModal';
import { indianStates } from '../StateandCity/State';
import { citiesByState } from "../StateandCity/City";

const EditOrderTable = () => {
    const allStateNames = Object.values(indianStates);

    const dispatch = useDispatch();
    const orderlistData = useSelector((state) => state.getALLOrderListData.orderlistData);
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || "";
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [editOrderDetail, setEditOrderDetail] = useState({})
    const [indiaState, setIndiaState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedFirmName, setSelectedFirmName] = useState([])
    const [firmNames, setFirmNames] = useState([]);

    useEffect(() => {
        functionS();
    }, []);

    const functionS = () => {
        dispatch(getOrderListData(UserRole?.User_Id)); // Pass the user ID to the thunk
    };

    const handleActions = (item) => {
        setEditOrderDetail(item)
        setShowModalEdit(true)
    }

    const handleStateChange = (state) => {
        setIndiaState(state);
        filterFirmNames(state, selectedCity); // Call filterFirmNames with updated state
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
        filterFirmNames(indiaState, city); // Call filterFirmNames with updated city
    };

    const filterFirmNames = (state, city) => {
        if (state && city) {
            console.log("Filtering for state and city:", state, city);
            const filteredFirmNames = orderlistData?.data
                .filter((item) => item.City === city)
                .map((item) => item.firmName);
            console.log("Filtered firm names:", filteredFirmNames);
            setFirmNames(filteredFirmNames);
            // } else if (state) {
            //     const filteredFirmNames = orderlistData?.data
            //         .filter((item) => item.State === state)
            //         .map((item) => item.firmName);
            //     console.log("Filtered firm names:", filteredFirmNames);
            //     setFirmNames(filteredFirmNames);
        } else {
            const allFirmNames = orderlistData?.data.map((item) => item.firmName);
            console.log("Filtered firm names:", allFirmNames);
            setFirmNames(allFirmNames);
        }
    };


    const handleFirmNameChange = (value) => {
        setSelectedFirmName(value);
    };

    return (
        <>
            <div className="p-3">
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col>
                                <div>
                                    <h3 style={{ color: 'maroon' }}>Order Details</h3>
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
                                        marginBottom: "5px",
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

                            <Col span={6} xs={24} sm={6} md={6} lg={6}>
                                <Select
                                    onChange={(value) => handleFirmNameChange(value)}
                                    placeholder="Select a Firm Name"
                                    value={selectedFirmName || null}
                                    showSearch
                                    style={{
                                        width: "100%",
                                        borderRadius: "5px",
                                    }}
                                    className='citySelect'
                                >
                                    {firmNames?.map((firmName, index) => (
                                        <Select.Option key={index} value={firmName}>
                                            {firmName}
                                        </Select.Option>
                                    ))}
                                </Select>

                            </Col>
                        </Row>
                        <Row className="mt-3" style={{ maxHeight: '66vh', height: '90vh', overflow: 'auto' }}>
                            <Col>
                                <Table bordered responsive>
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Firm Name</th>
                                            <th>City</th>
                                            <th>Date</th>
                                            <th>Mode</th> {/* Add this line for User Role */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderlistData?.data?.length > 0 &&
                                            orderlistData.data
                                                .filter((item) => {
                                                    if (selectedCity && selectedFirmName.length > 0) {
                                                        return item.City === selectedCity && selectedFirmName.includes(item.firmName);
                                                    } else if (selectedCity) {
                                                        return item.City === selectedCity;
                                                    } else if (selectedFirmName.length > 0) {
                                                        return selectedFirmName.includes(item.firmName);
                                                    } else {
                                                        return true;
                                                    }
                                                })
                                                .map((item, index) => {
                                                    const { firmName, City, Date_OrderList, orderMode } = item;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{firmName}</td>
                                                            <td>{City}</td>
                                                            <td>{Date_OrderList}</td>
                                                            <td>{orderMode}</td> {/* Display User_Id here */}
                                                            <td
                                                                style={{ cursor: 'pointer', color: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                                onClick={() => handleActions(item)}
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
            </div>
            {
                showModalEdit == true && <EditOrderModal showModalEdit setShowModalEdit={setShowModalEdit} editOrderDetail={editOrderDetail} />
            }
        </>
    );
};

export default EditOrderTable;
