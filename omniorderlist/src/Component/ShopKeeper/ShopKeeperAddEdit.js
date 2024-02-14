import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Commonbackbutton from '../CommonButtons/Commonbackbutton';
import Commonbutton from '../CommonButtons/Commonbutton';
import { useDispatch, useSelector, } from "react-redux"
import { Col, Row, Input } from "antd";
import { v4 as uuidv4 } from "uuid"
import MyContext from "../../MyContext";
import { shopkeeperDetails } from "../../Redux/Slice/addNewShopkeeperSlice"
import { updateShopkeeperData } from "../../Redux/Slice/shopkeeperSlice/updateShopkeeperSlice"
import "./shopkeeperdetailmodal.css"
import AddNewComponent from '../AddressComponent/AddNewComponent';
import AddressComponentNew from './AddressComponentNew.js';

const newObjPersonal = () => {
    
    return {
        Firm_Name: '',
        Shopkeeper_First_Name: '',
        Shopkeeper_Last_Name: '',
        Contact: '',
        Whatsup_Contact: '',
    };
};

const ShopKeeperAddEdit = ({ actionType, setShowAddEditModal, showAddEditModal, editInfo, funForListCall }) => {

    const addressInfoComRef = useRef('');
    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const dispatch = useDispatch()
    const userID = sessionStorage?.getItem("loggedUserId") || ""
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""
    const [userIDState, setUserIDState] = useState('')



    // console.log('userIDStateuserIDState', userIDState)

    const [personalInfo, setPersonalInfo] = useState({ ...newObjPersonal() })
    const { shopkeeperDetailStatus, shopkeeperDetailError } = useSelector((State) => State.addNewShopkeeper)

    const { updateShopKeeperDetailStatus, updateShopKeeperDetailError, updateShopKeeperRecored } = useSelector((State) => State.updateshopkeeperData)

    // console.log('updateShopKeailStatus', updateShopKeeperDetailStatus, updateShopKeeperDetailError, updateShopKeeperRecored)

    const [newContactInfo, setNewContactInfo] = useState({})
    const [getStatusState, setStatusState] = useState(false)
    // console.log("personalInfopersonalInfo", personalInfo)
    // console.log('actiontype', actionType, editInfo)

    useEffect(() => {
        if (actionType == 'EDIT') {
            console.log('editInfoeditInfo', actionType == 'EDIT', editInfo)
            const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || "";
            setPersonalInfo(prev => ({
                ...prev, ...editInfo,
                Updated_By: actionType === 'EDIT' ? UserRole?.Email_Id : '',

            }))
            setUserIDState(editInfo?.Shopkeeper_ID)
            addressInfoComRef.current.updateAddressFun(editInfo)

        } else {
            setUserIDState(uuidv4())
        }

    }, [actionType, editInfo])

    useEffect(() => {
        if (getStatusState == true) {
            callFunction()
        }
    }, [shopkeeperDetailStatus])


    const handleClose = () => {
        setShowAddEditModal(false)
        window.location.reload();
    }


    const handleChangeInput = (e) => {
        let { id, value } = e.target;

        // Convert the specified fields to uppercase
        if (id === 'Firm_Name' || id === 'Shopkeeper_First_Name' || id === 'Shopkeeper_Last_Name') {
            value = value.toUpperCase();
        }

        setPersonalInfo(prev => ({
            ...prev,
            [id]: value
        }));
    };



    const validate = () => {
        let errMsg;
        let { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, Contact, Whatsup_Contact } = personalInfo

        switch (true) {
            case Firm_Name === undefined || Firm_Name === '' || Firm_Name === null:
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
            // case GST_Number === '':
            //     errMsg = 'Enter GST Number';
            //     break;
            // case Shopkeeper_Email === '':
            //     errMsg = 'Enter Shopkeeper Email';
            //     break;

            default:
                return true;
        }

        handleShopToast(true, 'Error', errMsg);
        return false;
    };
    const getFormattedDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = currentDate.getFullYear();

        return `${year}-${month}-${day}`;
    };


    // const utcDateStr = editInfo?.Created_At;
    const utcDateStr = editInfo?.Created_At;
    const utcDate = new Date(utcDateStr);

    const year = utcDate.getUTCFullYear(); // Get the year (e.g., 2023)
    const month = utcDate.getUTCMonth() + 1; // Get the month (0-based index, so add 1)
    const day = utcDate.getUTCDate() + 1; // Get the day of the month and add 1

    // Format month and day to have leading zeros if needed
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    // Create the formatted date string in the "YYYY-MM-DD" format
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // console.log(formattedDate); // Output: "2023-09-20"



    // console.log("formattedDate", formattedDate); // Output: "2023-09-19"

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) return;
        if (addressInfoComRef.current.checkvalidation()) return;
    
        const { Address1, City, Country, Village_Street, State, Pincode } = newContactInfo;
    
        const obj1 = {
            Logged_User_ID: userID,
            Logged_Email_ID: UserRole.Email_Id,
            Logged_User_Role: UserRole.User_Role,
            Created_By: userID,
            Updated_By: "",
            Is_Active: "true",
            Created_At: actionType === 'EDIT' ? formattedDate : getFormattedDate(),
            Shopkeeper_ID: userIDState,
            ...personalInfo,
            Address1: Address1,
            City: City,
            Country: Country,
            Village_Street: Village_Street,
            State: State,
            Pincode: Pincode,
        };
    
        try {
            setStatusState(false); // Reset the status state
            if (actionType === 'EDIT') {
                console.log('objodadadbjobj', JSON.stringify(obj1, null, 2));
                await dispatch(updateShopkeeperData(obj1));
            } else {
                await dispatch(shopkeeperDetails(obj1));
            }
            setStatusState(true); // Set status state to trigger callFunction
        } catch (err) {
            handleShopToast(true, 'Error', 'Something went wrong.');
        }
    };
    
    useEffect(() => {
        if (getStatusState) {
            callFunction();
        }
    }, [getStatusState]);
    
    const callFunction = () => {
        if (shopkeeperDetailStatus === "pending" || updateShopKeeperDetailStatus === "pending") {
            setShowLoder(true);
        } else if (shopkeeperDetailStatus === "Success" || updateShopKeeperDetailStatus === "Success") {
            setShowLoder(false);
            if (actionType === 'EDIT') {
                handleShopToast(true, 'Success', 'Shopkeeper updated successfully.');
            } else {
                handleShopToast(true, 'Success', 'Shopkeeper added successfully.');
            }
            funForListCall();
            handleClose();
        } else if (shopkeeperDetailStatus === "rejected" || updateShopKeeperDetailStatus === "rejected") {
            setShowLoder(false);
            handleShopToast(true, 'Error', 'Something went wrong.');
        }
    };
    

    return (
        <>
            <Modal show={showAddEditModal} onHide={handleClose} centered backdrop={false} size="lg" style={{ zIndex: 9 }} >
                <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
                    <Modal.Title style={{ color: "white" }}>Shopkeeper Informtion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=''>

                        <Row className='d-flex justify-content-center'>
                            <Col span={24} xs={24} sm={24} md={24} lg={24} className="">
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
                                                            <Input type="text" placeholder="Enter Firm Name" name="Firm_Name" autoComplete="off" id='Firm_Name' style={{ marginBottom: "10px", height: "36px", borderRadius: "5px" }}
                                                                value={personalInfo?.Firm_Name} onChange={(e) => handleChangeInput(e)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row span={24} className=''>
                                                        <Col span={12} xs={24} sm={24} md={12} lg={12}>
                                                            <Input type="text" placeholder="First Name" name="Shopkeeper_First_Name" autoComplete="off" id='Shopkeeper_First_Name' className='personal-ingo-textbox'
                                                                value={personalInfo?.Shopkeeper_First_Name} onChange={(e) => handleChangeInput(e)}
                                                            />
                                                        </Col>
                                                        <Col span={12} xs={24} sm={24} md={12} lg={12} className='d-flex justify-content-end'>
                                                            <Input type="text" placeholder="Last Name" name="Shopkeeper_Last_Name" id="Shopkeeper_Last_Name" autoComplete="off" className='personal-ingo-textbox'
                                                                value={personalInfo?.Shopkeeper_Last_Name} onChange={(e) => handleChangeInput(e)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row span={24} className=''>
                                                        <Col span={12} xs={24} sm={24} md={12} lg={12}>
                                                            <Input type="text" placeholder="Contact" autoComplete="off" name="Contact" id="Contact" className='personal-ingo-textbox'
                                                                minlength="10" maxlength="10"
                                                                value={personalInfo?.Contact} onChange={(e) => handleChangeInput(e)} />
                                                        </Col>
                                                        <Col span={12} xs={24} sm={24} md={12} lg={12} className='d-flex justify-content-end'>
                                                            <Input type="text" placeholder="Whatsup Conatct" name="Whatsup_Contact" id="Whatsup_Contact" autoComplete="off" className='personal-ingo-textbox'
                                                                minlength="10" maxlength="10"
                                                                value={personalInfo?.Whatsup_Contact} onChange={(e) => handleChangeInput(e)}
                                                            />
                                                        </Col>

                                                    </Row>
                                                    {/* <Row span={24} className=''>

                                                        <Col span={12} xs={24} sm={24} md={12} lg={12}>
                                                            <Input type="text" placeholder="Business Registration Number" name="GST_Number" id="GST_Number" autoComplete="off"
                                                             value={personalInfo?.GST_Number}       onChange={(e) => handleChangeInput(e)} className='personal-ingo-textbox7'
                                                            />
                                                        </Col>
                                                        <Col span={12} xs={24} sm={24} md={12} lg={12} className='d-flex justify-content-end'  >
                                                            <Input type="text" placeholder="Email Id" id="Shopkeeper_Email" name='Shopkeeper_Email' autoComplete="off" className='personal-ingo-textbox8'
                                                              value={personalInfo?.Shopkeeper_Email}      onChange={(e) => handleChangeInput(e)} />
                                                        </Col>
                                                    </Row> */}
                                                </Col>
                                            </Row>
                                            <AddressComponentNew ref={addressInfoComRef} setNewContactInfo={setNewContactInfo} />
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col span={24} className="d-flex justify-content-between">
                                            <div>
                                                <Link to="#" onClick={handleClose}>
                                                    <Commonbackbutton backButtonText={"Cancel"} backbuttonwidth={105} />

                                                </Link>
                                            </div>
                                            <div>
                                                <Button type="submit" style={{ backgroundColor: "maroon", width: "110px", border: "none", height: "40px", color: "white" }}>
                                                    {actionType == 'ADD' ? 'SAVE' : 'UPDATE'}
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>

                    </div >

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ShopKeeperAddEdit