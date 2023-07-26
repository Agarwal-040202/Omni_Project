import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Commonbackbutton from '../CommonButtons/Commonbackbutton';
import Commonbutton from '../CommonButtons/Commonbutton';
import { Col, Row, Input } from "antd";
import "./preorderdetailmodal.css"
import ShopkeeperDetailModal from '../Shopkeepr Details/ShopkeeperDetailModal';

const PreOderDetailModal = (props) => {

    const [showModal, setShowModal] = useState(false)
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const handleClose = () => {
        props.setShowPreDetailModal(false)
    }

    const showShopkeeperModal = () => {
        setShowModal(true)
    }

    console.log("jkjkkkj", props.showPreOrderDetailModal)

    return (
        <div>

            <Modal show={props.showPreOrderDetailModal} onHide={handleClose}
                centered
                backdrop={false}
                size="lg"
            >
                <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
                    <Modal.Title style={{ color: "white" }}>Pre Order Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' mb-1'>

                        <Row className='d-flex justify-content-center'>
                            <Col span={24} xs={24} sm={24} md={24} lg={24} className="form-control">
                                <form
                                // onSubmit={handleSubmit}
                                >
                                    <Row className=''>
                                        <Col spn={24} lg={24} className=' w-100'>
                                            <Row>
                                                <Col span={24} className='form-control  w-100'>
                                                    <div>
                                                        <h6 className='info-tag-h6'>Filed Member Current Location</h6>
                                                    </div>

                                                    <Row>
                                                        <Col span={24} className='w-100'>

                                                            <Input
                                                                type="text"
                                                                placeholder="Enter Pramry Address"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='address-info-textbox'
                                                            />
                                                        </Col>

                                                    </Row>

                                                    <Row span={24} className=''>
                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}>
                                                            <Input
                                                                type="text"
                                                                placeholder="Country"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='address-info-texbox2'
                                                            />
                                                        </Col>
                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}
                                                            className='d-flex justify-content-end'

                                                        >
                                                            <Input
                                                                type="text"
                                                                placeholder="State"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='address-info-texbox2'

                                                            />
                                                        </Col>

                                                    </Row>
                                                    <Row span={24} className=''>

                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}>
                                                            <Input
                                                                type="text"
                                                                placeholder="City"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='address-info-texbox3'
                                                            />
                                                        </Col>
                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}
                                                            className='d-flex justify-content-end'
                                                        >
                                                            <Input
                                                                type="text"
                                                                placeholder="Pincode"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='address-info-texbox5'

                                                            />
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col span={24} className='w-100'>

                                                            <Input
                                                                type="text"
                                                                placeholder="Enter the Village or Street Adress"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='address-info-textbox6'
                                                            />
                                                        </Col>

                                                    </Row>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24} lg={24} className="form-control mt-2">
                                                    <div>
                                                        <h6 className='info-tag-h6'>Shopkeeper Detail</h6>

                                                    </div>
                                                    <Row>
                                                        <Col span={24} xs={24} sm={18} md={18} lg={18}>
                                                            <Input
                                                                type="text"
                                                                placeholder="Enter Firm Name"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                // className='personal-ingo-textbox'
                                                                style={{ marginBottom: "10px", height: "36px", borderRadius: "5px" }}
                                                            />
                                                        </Col>
                                                        <Col xs={24} sm={6} md={6} lg={6} className=' w-100'>
                                                            <div className='w-100 add-shopkeeper-button-col'>
                                                                <button type="submit" className='addshopkeeperbutton' onClick={showShopkeeperModal}>
                                                                    Add Shopkeeper
                                                                </button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row span={24} className=''>

                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}>

                                                            <Input
                                                                type="text"
                                                                placeholder="First Name"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='personal-ingo-textbox'
                                                            />
                                                        </Col>
                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}
                                                            className='d-flex justify-content-end'
                                                        >
                                                            <Input
                                                                type="text"
                                                                placeholder="Last Name"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='personal-ingo-textbox'

                                                            />
                                                        </Col>

                                                    </Row>

                                                    <Row span={24} className=''>

                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}>
                                                            <Input
                                                                type="text"
                                                                placeholder="GST Number"
                                                                name="company_n"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='personal-ingo-textbox7'

                                                            />
                                                        </Col>
                                                        <Col span={12}
                                                            xs={24}
                                                            sm={24}
                                                            md={12}
                                                            lg={12}
                                                            className='d-flex justify-content-end'
                                                        >
                                                            <Input
                                                                type="text"
                                                                placeholder="Whatsup Conatct"
                                                                autoComplete="off"
                                                                onChange={handleChange}
                                                                className='personal-ingo-textbox8'
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
                                                    <Commonbackbutton backButtonText={"Cancel"} backbuttonwidth={135} />

                                                </Link>
                                            </div>
                                            <div>
                                                <Commonbutton buttonText={"Save"} buttonwidth={135} />
                                                {/* <Button style={{ backgroundColor: "maroon" }}>Save</Button> */}

                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>

                    </div >

                </Modal.Body>
            </Modal>

            {
                showModal == true && <ShopkeeperDetailModal showModal={showModal} setShowModal={setShowModal} />
            }
        </div>
    )
}

export default PreOderDetailModal
