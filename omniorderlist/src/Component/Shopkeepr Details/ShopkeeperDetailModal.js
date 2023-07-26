import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Commonbackbutton from '../CommonButtons/Commonbackbutton';
import Commonbutton from '../CommonButtons/Commonbutton';
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, Input } from "antd";
import { v4 as uuidv4 } from "uuid"
import MyContext from "../../MyContext";
import { shopkeeperDetails } from "../../Redux/Slice/addNewShopkeeperSlice"

import "./shopkeeperdetailmodal.css"


const ShopkeeperDetailModal = (props) => {

    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const dispatch = useDispatch()
    const currentDate = new Date();
    const afterConvertDate = currentDate.toLocaleDateString()
    console.log("date",afterConvertDate)
    const parts = afterConvertDate.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    console.log("datekkk", formattedDate)


    const getFormattedDate = () => {
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = currentDate.getFullYear();

        return `${year}-${month}-${day}`;
    };

    console.log("ljljlljllj", getFormattedDate())

    const userID = sessionStorage?.getItem("loggedUserId") || ""
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""

    const newObjPersonal = () => {
        return { Firm_Name: '', Shopkeeper_First_Name: '', Shopkeeper_Last_Name: "", Contact: '', Whatsup_Contact: '', GST_Number: '', Shopkeeper_Email: '' }
    }
    const newObjContact = () => {
        return { Address1: "", Country: '', State: '', City: '', Pincode: '', Village_Street: '' }
    }

    const [userIDState, setUserIDState] = useState("")
    const [personalInfo, setPersonalInfo] = useState({ ...newObjPersonal() })
    const [contactInfo, setContactInfo] = useState({ ...newObjContact() })
    const [getStatusState, setStatusState] = useState(false)
    const { shopkeeperDetailStatus, shopkeeperDetailError } = useSelector((State) => State.shopkeeperDetails)

    console.log('personalInfo', shopkeeperDetailError, shopkeeperDetailStatus)

    useEffect(() => {
        setUserIDState(uuidv4())
        // randemID.slice(0, 6)
    }, [])


    useEffect(() => {
        if (getStatusState == true) {
            callFunction()
        }
    }, [shopkeeperDetailStatus])

    console.log("klklk", userIDState)

    const handleChange = () => {

    }

    const handleChangeInput = (e) => {
        let { id, value } = e.target
        setPersonalInfo(prev => ({
            ...prev, [id]: value
        }))

    }

    const handleChangeContact = (e) => {
        let { id, value } = e.target
        setContactInfo(prev => ({
            ...prev, [id]: value
        }))
    }

    const validate = () => {
        let errMsg;
        let { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, Contact, Whatsup_Contact, GST_Number, Shopkeeper_Email } = personalInfo

        let { Address1, Country, State, City, Pincode, Village_Street } = contactInfo;

        switch (true) {
            case Firm_Name === '':
                errMsg = 'Please enter firm name.';
                break;
            case Shopkeeper_First_Name === '':
                errMsg = 'Please enter first name';
                break;
            case Shopkeeper_Last_Name === '':
                errMsg = 'Enter Shopkeeper Last Name';
                break;
            case Contact === '':
                errMsg = 'Please enter Contact';
                break;
            case Whatsup_Contact === '':
                errMsg = 'Enter Whatsup Contact';
                break;
            case GST_Number === '':
                errMsg = 'Enter GST Number';
                break;
            case Shopkeeper_Email === '':
                errMsg = 'Enter Shopkeeper Email';
                break;
            case Address1 === '':
                errMsg = 'Please enter Address';
                break;
            case Country === '':
                errMsg = 'Please select Country';
                break;
            case State === '':
                errMsg = 'Please select State';
                break;
            case City === '':
                errMsg = 'Please select City';
                break;
            case Pincode === '':
                errMsg = 'Please select Pincode';
                break;
            case Village_Street === '':
                errMsg = 'Enter Village Street';
                break;
            default:
                return true;
        }

        handleShopToast(true, 'Error', errMsg);
        return false;
    };

    console.log("dddddd", personalInfo, contactInfo)

              // FieldMemberID: userID, FieldMember_Firstname: userFirstname, FieldMember_LastName: userLastname, FieldMember_EmailID: UserRole.Email_Id, FieldMember_Role: UserRole.User_Role, FieldMember_Contact: UserRole.Contact,


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const obj = { 
            Logged_User_ID: userID,
            Logged_Email_ID: UserRole.Email_Id,
            Logged_User_Role: UserRole.User_Role,
            Created_By: userID,
            Updated_By: "",
            Is_Active: "true",
            Created_At: getFormattedDate(),
            Shopkeeper_ID: userIDState,
             ...personalInfo, 
             ...contactInfo 
            }
        console.log(obj, "obj")
        try {
            
            dispatch(shopkeeperDetails(obj));
            setStatusState(true);
           
        } catch (err) {
            handleShopToast(true, 'Error', 'Something went wrong.');
        }
    };



    const callFunction = () => {
        if (shopkeeperDetailStatus == "pending") {
            setShowLoder(true)
        }
        else if (shopkeeperDetailStatus == "Success") {
            handleShopToast(true, 'Success', 'Shopkeeper add sucessfully.')
            handleClose()
            
        }
        else if (shopkeeperDetailStatus == "rejected"){
           
            handleShopToast(true, 'Error', 'Shopkeeper allready exists!');
            setShowLoder(true)

        }
    }


    const handleClose = () => {
        props.setShowModal(false)
    }

    console.log("jkjkkkj", props.showModal)

    return (
        <div>

            <Modal show={props.showModal} onHide={handleClose}
                centered
                backdrop={false}
                size="lg"
            >
                <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
                    <Modal.Title style={{ color: "white" }}>Shopkeeper Informtion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=''>

                        <Row className='d-flex justify-content-center'>
                            <Col span={24} xs={24} sm={24} md={24} lg={24} className="form-control  ">


                                <form onSubmit={handleSubmit}>
                                    <Row className=''>
                                        <Col spn={24} lg={24} className=' w-100'>
                                            <Row>
                                                <Col span={24} lg={24} className="form-control">
                                                    <div>
                                                        <h6 className='info-tag-h6'>Personal Informtion</h6>

                                                    </div>
                                                    <Row>
                                                        <Col span={24} xs={24} sm={24} md={24} lg={24}>
                                                            <Input
                                                                type="text"
                                                                placeholder="Enter Firm Name"
                                                                name="Firm_Name"
                                                                autoComplete="off"
                                                                id='Firm_Name'
                                                                defaultValue={personalInfo.Firm_Name}
                                                                // defaultValue={location?.state?.[0]?.Nationality == "" ? personalInfo.Nationality : location?.state?.[0]?.Nationality}
                                                                onChange={(e) => handleChangeInput(e)}
                                                                style={{ marginBottom: "10px", height: "36px", borderRadius: "5px" }}

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
                                                                placeholder="First Name"
                                                                name="Shopkeeper_First_Name"
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeInput(e)}
                                                                id='Shopkeeper_First_Name'
                                                                defaultValue={personalInfo.Shopkeeper_First_Name}
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
                                                                name="Shopkeeper_Last_Name"
                                                                id="Shopkeeper_Last_Name"

                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeInput(e)}
                                                                defaultValue={personalInfo.Shopkeeper_Last_Name}
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
                                                                placeholder="Contact"
                                                                autoComplete="off"
                                                                name="Contact"
                                                                id="Contact"
                                                                onChange={(e) => handleChangeInput(e)}
                                                                defaultValue={personalInfo.Contact}
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
                                                                placeholder="Whatsup Conatct"
                                                                name="Whatsup_Contact"
                                                                id="Whatsup_Contact"
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeInput(e)}
                                                                defaultValue={personalInfo.Whatsup_Contact}
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
                                                                placeholder="Business Registration Number"
                                                                name="GST_Number"
                                                                id="GST_Number"
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeInput(e)}
                                                                defaultValue={personalInfo.GST_Number}
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
                                                                placeholder="Email Id"
                                                                id="Shopkeeper_Email"
                                                                name='Shopkeeper_Email'
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeInput(e)}
                                                                defaultValue={personalInfo.Shopkeeper_Email}
                                                                className='personal-ingo-textbox8'

                                                            />
                                                        </Col>

                                                    </Row>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24} className='form-control mt-2 w-100'>
                                                    <div>
                                                        <h6 className='info-tag-h6'>Conatct Address</h6>
                                                    </div>

                                                    <Row>
                                                        <Col span={24} className='w-100'>

                                                            <Input
                                                                type="text"
                                                                placeholder="Enter Pramry Address"
                                                                name="Address1"
                                                                id="Address1"
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeContact(e)}
                                                                defaultValue={contactInfo.Address1}
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
                                                                name="Country"
                                                                id='Country'
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeContact(e)}
                                                                defaultValue={contactInfo.Country}
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
                                                                id='State'
                                                                name='State'
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeContact(e)}
                                                                defaultValue={contactInfo.State}
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
                                                                name='City'
                                                                id='City'
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeContact(e)}
                                                                defaultValue={contactInfo.City}
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
                                                                name="Pincode"
                                                                id='Pincode'
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeContact(e)}
                                                                defaultValue={contactInfo.Pincode}
                                                                className='address-info-texbox5'

                                                            />
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col span={24} className='w-100'>

                                                            <Input
                                                                type="text"
                                                                placeholder="Enter the Village or Street Adress"
                                                                name="Village_Street"
                                                                id='Village_Street'
                                                                autoComplete="off"
                                                                onChange={(e) => handleChangeContact(e)}
                                                                defaultValue={contactInfo.Village_Street}
                                                                className='address-info-textbox6'
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
                                                {/* <Commonbutton buttonText={"Save"} buttonwidth={135} /> */}
                                                <Button type="submit" style={{ backgroundColor: "maroon" }}>Save</Button>

                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>

                    </div >

                </Modal.Body>
            </Modal>


        </div>
    )
}

export default ShopkeeperDetailModal
