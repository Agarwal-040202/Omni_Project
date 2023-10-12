import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getShopkeeperData } from "../../Redux/Slice/getShopkeeperDataSlice"
import "./shopkeepertabledetails.css"
import ShopKeeperAddEdit from './ShopKeeperAddEdit'

const ShopKeeperList = () => {
    const { shopKeeperData } = useSelector((state) => state.getShopKeeperData)
    const dispatch=useDispatch()
    
    const [showAddEditModal,setShowAddEditModal]=useState(false)
    const [actionType,setActionType]=useState('ADD')
    const [editInfo,setEditInfo]=useState('')
    console.log('editInfo',actionType,editInfo)

    console.log("shopfdfdfkeeper",shopKeeperData)

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

    const handleActions=(actionType,value)=>{
        console.log('valuevaluevalue',value)
        setEditInfo(value)
        setActionType(actionType)
        setShowAddEditModal(true)
    }


    return (
        <>
            <div className='p-3 ' style={{ maxHeight: "90vh", height: "90vh", overflow: "auto" }}>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col> <div><h3>Shoopkeeper Details</h3></div></Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col span={14} xs={24} sm={14} md={14} lg={14} className="input-group Serach-Input-Box-Div">
                                <input type="text" className="form-control" placeholder="Search for occurrences" />
                                <a href="#" style={{ backgroundColor: "#F4F6F6" }}><img className='' height={40} src="eventSearchIngIcon.svg" /></a>
                            </Col>
                            <Col span={10} xs={24} sm={10} md={10} lg={10} className='button-submit-col'>
                                <div>
                                    <Link to="/fourbox"> <button className='backbutton'>Back</button></Link>
                                </div>
                                <div className='m-0 p-0'>
                                    <Link className="" to="#"  >
                                        <div className="" > <button className="Add-shopkeeper-btn" type="submit" onClick={()=>handleActions('ADD',"")}>  Add Shopkeeper</button></div>
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
                                            <th >Address</th>
                                            <th >State</th>
                                            <th >City</th>
                                            <th >Village Name</th>
                                            <th >Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shopKeeperData?.data !== undefined && shopKeeperData.data != '' && shopKeeperData?.data?.length > 0 && shopKeeperData?.data?.map((item, index) => {
                                            const { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, GST_Number, Contact, Whatsup_Contact, Address1, City, State, Village_Street } = item
                                            return (<>
                                                <tr>
                                                    <td >{Firm_Name}</td>
                                                    <td >{Shopkeeper_First_Name + " " + Shopkeeper_Last_Name}</td>
                                                    <td >{GST_Number}</td>
                                                    <td >{Whatsup_Contact}</td>
                                                    <td >{Address1}</td>
                                                    <td >{State}</td>
                                                    <td >{City}</td>
                                                    <td >{Village_Street}</td>
                                                    <td style={{ cursor: "pointer", color: "blue", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={()=>handleActions('EDIT',item)} >Edit</td>

                                                </tr>
                                            </>)
                                        })}

                                    </tbody>
                                </Table>

                            </Col>
                        </Row>


                    </Col>
                </Row> 

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
    )
}

export default ShopKeeperList