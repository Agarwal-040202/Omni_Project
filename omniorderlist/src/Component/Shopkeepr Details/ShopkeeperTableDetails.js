import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Commonbutton from '../CommonButtons/Commonbutton'
import ShopkeeperDetailModal from './ShopkeeperDetailModal'
import { useDispatch, useSelector } from "react-redux"
import { getShopkeeperData } from "../../Redux/Slice/getShopkeeperDataSlice"
import "./shopkeepertabledetails.css"

const ShopkeeperTableDetails = (props) => {
    const dispatch = useDispatch();

    const { shopKeeperData} = useSelector((State) => State.getShopKeeperData)


    // console.log('persojjjnakkklInfo', shopKeeperData?.data)

    const [showModal, setShowModal] = useState(false)
    const [shopkeeperSingleData,setShopkeeperSingleData] = useState([])
    const [newEntry,setNewEntry] = useState(false)

    useEffect(() => {
        functionS()
    }, [])

    const functionS = () => {
        try {
            dispatch(getShopkeeperData());

        }
        catch (err) {
            console.log(err)
        }
    }

    const addShopkeeperdetail = () => {
        setShowModal(true)
        setNewEntry(true)
    }

    const updateShopkeeperdetailFunction = (e)=>{
        setShowModal(true)
        // console.log("index", shopKeeperData?.data[e])
        setShopkeeperSingleData(shopKeeperData?.data[e])
        setNewEntry(false)


    }
    const companyInfoEditModal = () => {

    }

    console.log("shopkeeperSingleData", shopkeeperSingleData)

    return (
        <div className='p-3 ' style={{ maxHeight: "90vh", height: "90vh", overflow: "hidden" }}>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col>
                            <div>
                                <h3>Shoopkeeper Details</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col span={14} xs={24} sm={14} md={14} lg={14} className="input-group Serach-Input-Box-Div">
                            <input type="text" className="form-control" placeholder="Search for occurrences"
                            // onChange={handleSearch} 
                            />
                            <a href="#" style={{ backgroundColor: "#F4F6F6" }}><img className='' height={40} src="eventSearchIngIcon.svg" /></a>
                        </Col>
                        <Col span={10} xs={24} sm={10} md={10} lg={10} className='button-submit-col'>
                            <div>
                                <Link to="/fourbox">
                                    <button className='backbutton'>Back</button>
                                    {/* <Commonbackbutton backButtonText={"Back"} backbuttonwidth={135} /> */}

                                </Link>
                            </div>
                            <div className='m-0 p-0'>
                                <Link className="" to="#" onClick={addShopkeeperdetail} >
                                    <div className="" >
                                        <button
                                            className="Add-shopkeeper-btn"
                                            type="submit"
                                        // onClick={addEditModalFun}
                                        >
                                            Add Shopkeeper
                                        </button>
                                    </div>
                                    {/* <Commonbutton buttonText={"Add Shopkeeper"} /> */}
                                </Link>
                            </div>


                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <h6 style={{ color: "maroon" }}>Shopkeeper Information </h6>
                            <Table bordered responsive>
                                <thead className='bg-light'>
                                    <tr>
                                        <th >Firm_Name</th>
                                        <th >Owner_Name</th>
                                        <th >GST Number</th>
                                        <th >Conatact</th>
                                        {/* <th >Email Id</th> */}
                                        <th >Address</th>
                                        <th >City</th>
                                        <th >State</th>
                                        {/* <th >Pincode</th> */}
                                        <th >Village Name</th>
                                        <th >Action </th>


                                        {/* {Array.from({ length: 12 }).map((_, index) => (
                                            <th key={index}>Table heading</th>
                                        ))} */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {shopKeeperData?.data != "" && shopKeeperData?.data.map((tabelData,index)=>{
                                        return(
                                            <>
                                                <tr>
                                                    {/* {console.log("tabelData", tabelData)} */}
                                                    <td >{tabelData?.Firm_Name}</td>
                                                    <td >{tabelData?.Shopkeeper_First_Name + " " + tabelData?.Shopkeeper_Last_Name}</td>
                                                    <td >{tabelData?.GST_Number}</td>
                                                    <td >{tabelData?.Contact + ", " + tabelData?.Whatsup_Contact}</td>
                                                    {/* <td >sumitprostore@gmail.com</td> */}
                                                    <td >{tabelData?.Address1}</td>
                                                    <td >{tabelData?.City}</td>
                                                    <td >{tabelData?.State}</td>
                                                    {/* <td >123456</td> */}
                                                    <td >{tabelData?.Village_Street}</td>

                                                    <td style={{ cursor: "pointer", color: "blue", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={(e)=>updateShopkeeperdetailFunction(index)}>Edit</td>

                                                    {/* {Array.from({ length: 12 }).map((_, index) => (
                                            <td key={index}>Table cell {index}</td>
                                        ))} */}
                                                </tr>
                                            </>
                                        )
                                    })}
                                   

                                </tbody>
                            </Table>

                        </Col>
                    </Row>


                    {/* <Row className='mt-2'>
                        <Col>
                            <h6 style={{ color: "maroon" }} >Primary Addresss Information</h6>
                            <Table bordered responsive>
                                <thead className='bg-light'>
                                    <tr >
                                        <th >Address</th>
                                        <th >City</th>
                                        <th >State</th>
                                        <th >Pincode</th>
                                        <th >Village Name</th>
                                        <th >Action </th>

                                    </tr>
                                </thead>
                                <tbody >
                                    <tr >
                                        <td >Sumit & Arpit Company address Sumit & Arpit Company address</td>
                                        <td >Delhi</td>
                                        <td >Delhi</td>
                                        <td >123456</td>
                                        <td >Sushant Lok</td>

                                        <td style={{ cursor: "pointer", color: "blue", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={addShopkeeperdetail}>Edit</td>

                                    </tr>

                                </tbody>
                            </Table>

                        </Col>
                    </Row> */}
                </Col>
            </Row>
            {
                showModal == true && <ShopkeeperDetailModal showModal={showModal} setShowModal={setShowModal} shopkeeperSingleData={shopkeeperSingleData} newEntry={newEntry} />
            }

        </div>
    )
}

export default ShopkeeperTableDetails
