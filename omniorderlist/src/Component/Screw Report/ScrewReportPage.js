import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportListData } from '../../Redux/Slice/reportListSlice/getReportListDataSlice';
import { Col, Row, Select } from 'antd';
import { Table } from 'react-bootstrap';
// import EditOrderModal from './EditOrderModal';
import { indianStates } from '../StateandCity/State';
import { citiesByState } from "../StateandCity/City";
import Button from "react-bootstrap/Button";
import EditReportModal from './EditReportModal';
import ScrewReportModal from './ScrewReportModal';

const ScrewReportPage = () => {

    const allStateNames = Object.values(indianStates);

    const dispatch = useDispatch();
    const reportlistData = useSelector((state) => state.getALLReportListData.reportlistData);
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || "";

    const [showScrewTable, setShowScrewTable] = useState(false)



    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalReport, setShowModalReport] = useState(false)
    const [editReportDetail, setEditReportDetail] = useState({})
    const [indiaState, setIndiaState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedFirmName, setSelectedFirmName] = useState([])
    const [firmNames, setFirmNames] = useState([]);

    useEffect(() => {
        functionS();
    }, []);

    const showPartyTable = () => {
        setShowScrewTable(true)
    }

    const showScrewReportTableFunction = () => {
        setShowScrewTable(false)
    }

    const functionS = () => {
        dispatch(getReportListData(UserRole?.User_Id)); // Pass the user ID to the thunk
    };


    const handleActionsShowReportModal = ()=>{
        setShowModalReport(true)
    }
    const handleActions = (item) => {
        setEditReportDetail(item)
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
            const filteredFirmNames = reportlistData?.data
                .filter((item) => item.City === city)
                .map((item) => item.firmName);
            console.log("Filtered firm names:", filteredFirmNames);
            // setFirmNames(filteredFirmNames);

            setFirmNames([...new Set(filteredFirmNames.map(name => name.trim()))]);

            console.log("filteredFirmNames:", filteredFirmNames);
            console.log("Set(filteredFirmNames):", new Set(filteredFirmNames));

        } else {
            const allFirmNames = reportlistData?.data.map((item) => item.firmName);
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
                                    <h3 style={{
                                            color: "maroon",
                                            
                                        }}>Report Details</h3>
                                    {/* <Button
                                        type="submit"
                                        onClick={showPartyTable}
                                        style={{
                                            backgroundColor: "#52c41a", // Change background color
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50px",
                                            padding: "8px 16px",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            width: "130px"
                                        }}
                                    >Shop Report</Button> */}
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Button
                                        type="submit"
                                        onClick={handleActionsShowReportModal}

                                        style={{
                                            backgroundColor: "black", // Change background color
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50px",
                                            padding: "8px 16px",
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            width: "130px",
                                            marginLeft: "7px"
                                        }}
                                    >Create Report</Button>
                                </div>
                            </Col>
                            {/* <Col>
                                <div style={{ width: "30px", display: "flex", justifyContent: "end", marginLeft: "7px", }}>
                                    <img src="/report-icon.jpg" className='img-fluid' style={{ cursor: "pointer" }}
                                        onClick={handleActionsShowReportModal}
                                    />
                                </div>
                            </Col> */}
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
                                                <th>State</th>
                                                <th>City</th>
                                                <th>Action</th> {/* Add this line for User Role */}
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportlistData?.data?.length > 0 &&
                                                reportlistData.data
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
                                                        const { firmName, City, Date_ReportList, reportMode, stateName } = item;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{firmName}</td>
                                                                <td>{stateName}</td>
                                                                <td>{City}</td>
                                                                {/* <td>{Date_OrderList}</td> */}
                                                                {/* <td>{orderMode}</td> */}
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
                showModalEdit == true && <EditReportModal showModalEdit setShowModalEdit={setShowModalEdit} editReportDetail={editReportDetail} />

            }
            {
                showModalReport == true && <ScrewReportModal showModalReport setShowModalReport={setShowModalReport} />
            }
        </>
    );
};

export default ScrewReportPage;
