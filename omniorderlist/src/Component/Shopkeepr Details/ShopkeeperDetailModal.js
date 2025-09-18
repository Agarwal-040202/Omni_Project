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
import {updateShopkeeperData} from "../../Redux/Slice/shopkeeperSlice/updateShopkeeperSlice"
import "./shopkeeperdetailmodal.css"
import AddNewComponent from '../AddressComponent/AddNewComponent';
import AddressComponentNew from './AddressComponentNew';

const newObjPersonal = () => {
    return { Firm_Name: '', Shopkeeper_First_Name: '', Shopkeeper_Last_Name: "", Contact: '', Whatsup_Contact: ''}
}
const ShopkeeperDetailModal = (props) => {
    const addressInfoComRef = useRef('');
    let { handleShopToast, setShowLoder } = useContext(MyContext)
    // console.log('shopkeepeData', props.shopkeeperSingleData)

    const dispatch = useDispatch()

    const [userIDState, setUserIDState] = useState("")
    const [personalInfo, setPersonalInfo] = useState({ ...newObjPersonal() })
    const [newContactInfo, setNewContactInfo] = useState({})
    const [getStatusState, setStatusState] = useState(false)
    const [address, setAd] = useState({})
    const [demoState, setDemoState] = useState(false)
    const [enterTextBox,setEnterTextBox] = useState(false)
    const [addressTextBoxState, setAddressTextBoxState] = useState(false)


    const { shopkeeperDetailStatus, shopkeeperDetailError } = useSelector((State) => State.addNewShopkeeper)

    // console.log('persongfdsdsalInfo', shopkeeperDetailError, shopkeeperDetailStatus)

    const {  updateShopKeeperDetailStatus, updateShopKeeperDetailError,updateShopKeeperRecored } = useSelector((State) => State.updateshopkeeperData)

    // console.log('updateShopKeailStatus', updateShopKeeperDetailStatus, updateShopKeeperDetailError,updateShopKeeperRecored)


    const currentDate = new Date();
    const afterConvertDate = currentDate.toLocaleDateString()
    // console.log("date", afterConvertDate)
    const parts = afterConvertDate.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    // console.log("datekkk", formattedDate)


    const getFormattedDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = currentDate.getFullYear();

        return `${year}-${month}-${day}`;
    };

    // console.log("ljljlljllj", getFormattedDate())

    const userID = sessionStorage?.getItem("loggedUserId") || ""
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""

    // console.log("lkjlkjjklljjkjk", addressTextBoxState, address, props.shopkeeperSingleData)


    useEffect(() => {
        setUserIDState(uuidv4())
        // randemID.slice(0, 6)
    }, [])

    // console.log("props.shopkeeperSingleData", props.shopkeeperSingleData)

    useEffect(() => {
        setPersonalInfo(prev => ({
            ...prev,
            Firm_Name: enterTextBox == true ? personalInfo.Firm_Name : props.shopkeeperSingleData.Firm_Name,
            Shopkeeper_First_Name: props.shopkeeperSingleData.length == 0 ? personalInfo.Shopkeeper_First_Name : props.shopkeeperSingleData.Shopkeeper_First_Name,
            Shopkeeper_Last_Name: props.shopkeeperSingleData.length == 0 ? personalInfo.Shopkeeper_Last_Name : props.shopkeeperSingleData.Shopkeeper_Last_Name,
            Contact: props.shopkeeperSingleData.length == 0 ? personalInfo.Contact : props.shopkeeperSingleData.Contact,
            Whatsup_Contact: props.shopkeeperSingleData.length == 0 ? personalInfo.Whatsup_Contact : props.shopkeeperSingleData.Whatsup_Contact,
            GST_Number: props.shopkeeperSingleData.length == 0 ? personalInfo.GST_Number : props.shopkeeperSingleData.GST_Number,
            Shopkeeper_Email: props.shopkeeperSingleData.length == 0 ? personalInfo.Shopkeeper_Email : props.shopkeeperSingleData.Shopkeeper_Email

        }))

    }, [props.shopkeeperSingleData,enterTextBox])


    useEffect(() => {
        if (props.shopkeeperSingleData?.Address1?.length != 0) {
            setAddressTextBoxState(false)
        }
    }, [props.shopkeeperSingleData])


    useEffect(() => {
        if (getStatusState == true) {
            callFunction()
        }
    }, [shopkeeperDetailStatus])

    useEffect(() => {
        if (props.shopkeeperSingleData != undefined && props.shopkeeperSingleData != '' && props.newEntry == false) {
            addressInfoComRef.current.updateAddressFun(props.shopkeeperSingleData)
        }
    }, [props])


    const handleChangeInput = (e) => {
        let { id, value } = e.target
        setPersonalInfo(prev => ({
            ...prev, [id]: value
        }))
        setEnterTextBox(true)
    }

    // console.log("sdsgsssgsdg",enterTextBox,personalInfo.Firm_Name)

    const validate = () => {
        let errMsg;
        let { Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, Contact, Whatsup_Contact, GST_Number, Shopkeeper_Email } = personalInfo

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
            case GST_Number === '':
                errMsg = 'Enter GST Number';
                break;
            case Shopkeeper_Email === '':
                errMsg = 'Enter Shopkeeper Email';
                break;

            default:
                return true;
        }

        handleShopToast(true, 'Error', errMsg);
        return false;
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;
        if (addressInfoComRef.current.checkvalidation()) {
            return;
        }

    // console.log("eeeeddsdsdsd", personalInfo)
    
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
            ...newContactInfo
        }
        // console.log(obj, "objecfdfdtkjlk")

        if(props.shopkeeperSingleData != ""){
            try{
            
            //   dispatch(updateShopkeeperData(obj))
              setStatusState(true);
            }
            catch(err){
                handleShopToast(true, 'Error', 'Something went wrong.');

            }
        }
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
        else if (shopkeeperDetailStatus == "rejected") {

            handleShopToast(true, 'Error', 'Shopkeeper allready exists!');
            setShowLoder(true)

        }
    }


    const handleClose = () => {
        props.setShowModal(false)

    }

    // console.log("jkjkkkj", props.showModal)

    return (
        <div>

            <Modal show={props.showModal} onHide={handleClose}
                centered
                backdrop={false}
                size="lg"
                style={{ zIndex: 9 }}
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
                                                                defaultValue={props.newEntry == true ? "" : enterTextBox == false ? props.shopkeeperSingleData?.Firm_Name : personalInfo.Firm_Name}
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
                                                                defaultValue={props.newEntry == true ? "" : props.shopkeeperSingleData != '' ? props.shopkeeperSingleData?.Shopkeeper_First_Name : personalInfo.Shopkeeper_First_Name}
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
                                                                defaultValue={props.newEntry == true ? "" : props.shopkeeperSingleData != '' ? props.shopkeeperSingleData?.Shopkeeper_Last_Name : personalInfo.Shopkeeper_Last_Name}
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
                                                                defaultValue={props.newEntry == true ? "" : props.shopkeeperSingleData != '' ? props.shopkeeperSingleData?.Contact : personalInfo.Contact}
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
                                                                defaultValue={props.newEntry == true ? "" : props.shopkeeperSingleData != '' ? props.shopkeeperSingleData?.Whatsup_Contact : personalInfo.Whatsup_Contact}
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
                                                                defaultValue={props.newEntry == true ? "" : props.shopkeeperSingleData != '' ? props.shopkeeperSingleData?.GST_Number : personalInfo.GST_Number}
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
                                                                defaultValue={props.newEntry == true ? "" : props.shopkeeperSingleData != '' ? props.shopkeeperSingleData?.Shopkeeper_Email : personalInfo.Shopkeeper_Email}
                                                                className='personal-ingo-textbox8'

                                                            />
                                                        </Col>

                                                    </Row>

                                                </Col>
                                            </Row>
                                            <AddressComponentNew ref={addressInfoComRef} setNewContactInfo={setNewContactInfo} />
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
                                                <Button type="submit" style={{ backgroundColor: "maroon", width: "140px", border: "none", height: "40px" }}>{props.shopkeeperSingleData != "" && props.newEntry == false ? "Update" : "Save"}</Button>

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
