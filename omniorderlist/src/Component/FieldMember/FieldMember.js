import React, { useState, useContext, useEffect } from 'react'
import { Col, Row, Input, Button } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./fieldmember.css"
import Commonbackbutton from '../CommonButtons/Commonbackbutton';
import Commonbutton from '../CommonButtons/Commonbutton';
import { useDispatch, useSelector } from "react-redux"
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MyContext from "../../MyContext";
import { fileldMemberDetail } from "../../Redux/Slice/feildMemberDetailsSlice"
import AddressComponent from '../AddressComponent/AddressComponent';


const newObjPersonal = () => {
    return { Gender: '', Nationality: '', MaritalStatus: "", Qualification: '' }
}
const newObjContact = () => {
    return { Address: "", Country: '', State: '', City: '', Pincode: '' }
}

const FieldMember = () => {

    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const userID = sessionStorage?.getItem("loggedUserId") || ""
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""

    const [address, setAd] = useState({})
    const [demoState, setDemoState] = useState(false)

    const [startDate, setStartDate] = useState(new Date());
    const [personalInfo, setPersonalInfo] = useState({ ...newObjPersonal() })
    const [contactInfo, setContactInfo] = useState({ ...newObjContact() })
    const [contactInformation, setContactInformation] = useState({ 
        Address: address.addressLine1, 
        Country: address.country, 
        State: address.state, 
        City: address.city, 
        Pincode: address.zipcode
    })

    // const [userDetailState, setUserDetailState] = useState(personalInfo, contactInfo)
    const [getStatusState, setStatusState] = useState(false)
    const { fileldMemberDetailStatus, fileldMemberDetailError } = useSelector((State) => State.fieldMemberDetail)

    console.log('personalInfo', fileldMemberDetailError, fileldMemberDetailStatus)

    const formattedDate = new Date(startDate).toLocaleDateString("en-US");
    console.log("Date", formattedDate)

    console.log("location", location?.state?.[0])

    const userFirstname = UserRole?.User_Name?.trim()?.split(" ")[0];
    const wordsArray = UserRole?.User_Name?.split(" ");
    const userLastname = wordsArray && wordsArray.length > 1 ? wordsArray[1]?.trim() || " " : " ";


    useEffect(() => {
        if (location?.state?.[0] != undefined) {
            
            setPersonalInfo((prev) => ({
                ...prev, ...location?.state[0]
            }))
        }
    }, [location])

    useEffect(() => {
        if (address?.addressLine1 != undefined) {

            setPersonalInfo((prev) => ({
                ...prev, ...address
            }))
        }
    }, [address])

    const getFormattedDate = () => {

        const day = startDate?.getDate();
        const month = startDate?.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = startDate?.getFullYear();

        return `${year}-${month}-${day}`;
    };

    console.log("ddsdsd", getFormattedDate())



    useEffect(() => {
        if (getStatusState == true) {
            callFunction()
        }
    }, [fileldMemberDetailStatus])


    useEffect(() => {
        setDemoState(false)

    }, [location])

    console.log("demoState1", address?.addressLine1)


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
    console.log('ppppppppppppalInfo', personalInfo, )

    const validate = () => {
        let errMsg;
        let { Gender, Nationality, MaritalStatus, Qualification } = personalInfo;
        // let { Address,  } = contactInfo;

        switch (true) {
            case Gender === '':
                errMsg = 'Please select Gender';
                break;
            case Nationality === '':
                errMsg = 'Please enter nationality.';
                break;
            case MaritalStatus === '':
                errMsg = 'Please select marital status';
                break;
            case Qualification === '':
                errMsg = 'Please select Qualification';
                break;
            case getFormattedDate() == "undefined-NaN-undefined":
                errMsg = 'Please select Date Of Joining';
                break;
            case address?.addressLine1 == undefined :
                errMsg = 'Please enter Address';
                break;
            case address?.country === '' || address?.country === undefined:
                errMsg = 'Please enter Country';
                break;
            case address?.state === '' || address?.state === undefined :
                errMsg = 'Please enter State';
                break;
            case address?.city === '' || address?.city === undefined:
                errMsg = 'Please enter City';
                break;
            case address?.zipcode === '' || address?.zipcode === undefined:
                errMsg = 'Please enter Pincode';
                break;
            default:
                return true;
        }

        handleShopToast(true, 'Error', errMsg);
        return false;
    };

    console.log("dddddd", contactInformation)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const obj = { 
            FieldMemberID: userID, 
            FieldMember_Firstname: userFirstname, 
            FieldMember_LastName: userLastname, 
            FieldMember_EmailID: UserRole.Email_Id, 
            FieldMember_Role: UserRole.User_Role, 
            FieldMember_Contact: UserRole.Contact, 
            Date_Of_Joining: getFormattedDate(), 
            Address: address?.addressLine1, 
            ...personalInfo
            // ...contactInformation
        }
        console.log("objjkjkjkj",obj)
        try {
            dispatch(fileldMemberDetail(obj));
            setStatusState(true);
        } catch (err) {
            handleShopToast(true, 'Error', 'Something went wrong.');
        }
    };



    const callFunction = () => {

        if (fileldMemberDetailStatus == "pending") {
            setShowLoder(true)
        }
        else if (fileldMemberDetailStatus == "Success") {
            // setTimeout(() => {
            handleShopToast(true, 'Success', 'Detail add sucessfully.')
            navigate("/fourbox")

            // }, 3000)
        }
        // else{
        //     console.log(fileldMemberDetailError,"llllllllllllll")
        //     handleShopToast(true, 'Error', 'Somthing went wrong.') 
        // }

    }

    return (

        <div className='container mb-1'>
            <Row>
                <Col span={24} lg={24} className=" d-flex justify-content-center">
                    <div className="">
                        <h4 className="company-heading-tag-h4">Field Member Informtion</h4>
                    </div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col span={16} xs={22} sm={22} md={22} lg={16} className="form-control  ">


                    <form onSubmit={handleSubmit}>
                        <Row className=''>
                            <Col spn={24} lg={24} className='py-2 w-100'>
                                <Row className='w-100'>
                                    <Col span={6} xs={24} sm={24} md={6} lg={6} className='m-0 p-0 profile-imge-col' >
                                        <div className='profile-div'>
                                            <img src="profileimg.jpeg" className='' style={{ objectFit: "contain", backgroundRepeat: "no-repeat", width: "100%", height: "100%" }} />
                                        </div>
                                    </Col>
                                    <Col span={9} xs={24} sm={24} md={9} lg={9} className='d-flex justify-content-center align-items-center'>
                                        <Input
                                            type="text"
                                            placeholder="Email Id"

                                            autoComplete="off"
                                            // defaultValue={UserRole.Email_Id}
                                            value={UserRole.Email_Id}
                                            disabled={true}
                                            className='profile-input profile-input-one'
                                            style={{ color: "black" }}
                                        />
                                    </Col>
                                    <Col span={10} xs={24} sm={24} md={9} lg={9} className='d-flex justify-content-end align-items-center' >
                                        <Input
                                            type="text"
                                            placeholder="Roll"
                                            autoComplete="off"
                                            // defaultValue={UserRole.User_Role}
                                            value={UserRole.User_Role}
                                            disabled={true}
                                            className='profile-input profile-input-one'
                                            style={{ color: "black" }}

                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} lg={24} className="form-control mt-2">
                                        <div>
                                            <h6 className='info-tag-h6'>Personal Informtion</h6>
                                        </div>
                                        <Row span={24} className=''>

                                            <Col span={12}
                                                xs={24}
                                                sm={24}
                                                md={12}
                                                lg={12}>

                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    name="FieldMember_Firstname"
                                                    autoComplete="off"
                                                    disabled={true}
                                                    className='personal-ingo-textbox'
                                                    // defaultValue={userFirstname}
                                                    value={userFirstname}
                                                    style={{ color: "black" }}
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
                                                    name="FieldMember_LastName"
                                                    disabled={true}
                                                    autoComplete="off"
                                                    className='personal-ingo-textbox'
                                                    // defaultValue={userLastname}
                                                    value={userLastname}
                                                    style={{ color: "black" }}

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
                                                    placeholder="Conatct"
                                                    autoComplete="off"
                                                    name='FieldMember_Contact'
                                                    disabled
                                                    className='personal-ingo-textbox'
                                                    defaultValue={UserRole.Contact}
                                                    style={{ color: "black" }}

                                                />
                                            </Col>
                                            <Col span={12}
                                                xs={24}
                                                sm={24}
                                                md={12}
                                                lg={12}
                                                className='d-flex justify-content-end'
                                            >
                                                <Form.Select size="sm"
                                                    className='personal-ingo-textbox'
                                                    id="Gender"
                                                    name='Gender'
                                                    onChange={(e) => handleChangeInput(e)}
                                                    value={personalInfo.Gender}

                                                >
                                                    <option value='' disabled selected hidden>Gender</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </Form.Select>


                                            </Col>

                                        </Row>
                                        {console.log("tytytyytytyt", personalInfo.Nationality)}
                                        <Row span={24} className=''>

                                            <Col span={12}
                                                xs={24}
                                                sm={24}
                                                md={12}
                                                lg={12}>
                                                <Input
                                                    type="text"
                                                    placeholder="Nationality"
                                                    name="Nationality"
                                                    id='Nationality'
                                                    autoComplete="off"
                                                    value={personalInfo.Nationality}
                                                    onChange={(e) => handleChangeInput(e)}
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

                                                <Form.Select size="sm"
                                                    className='personal-ingo-textbox'

                                                    onChange={(e) => handleChangeInput(e)}
                                                    name='MaritalStatus'
                                                    id='MaritalStatus'
                                                    value={personalInfo.MaritalStatus}

                                                >
                                                    <option disabled value='' selected hidden>Marital Status</option>
                                                    <option>Married</option>
                                                    <option>Single</option>
                                                </Form.Select>

                                            </Col>

                                        </Row>
                                        <Row span={24} className=''>

                                            <Col span={12}
                                                xs={24}
                                                sm={24}
                                                md={12}
                                                lg={12}>

                                                <Form.Select size="sm"
                                                    className='personal-ingo-textbox'
                                                    onChange={(e) => handleChangeInput(e)}
                                                    name="Qualification"
                                                    id='Qualification'
                                                    value={personalInfo.Qualification}
                                                // defaultValue={location?.state?.[0]?.Qualification == "" ? personalInfo.Qualification : location?.state?.[0]?.Qualification}

                                                >
                                                    <option value="" disabled selected hidden>Qulification</option>
                                                    <option>Intermediate</option>
                                                    <option>Graduate</option>
                                                    <option>Postgraduate</option>

                                                </Form.Select>

                                            </Col>
                                            <Col span={12}
                                                xs={24}
                                                sm={24}
                                                md={12}
                                                lg={12}
                                                className='d-flex '

                                            >
                                                <DatePicker
                                                    placeholderText="Select date of joining"
                                                    isClearable
                                                    showIcon
                                                    closeOnScroll={true}
                                                    selected={startDate} onChange={(date) => setStartDate(date)}
                                                    dateFormat="yyyy-MM-dd"
                                                    className='personal-ingo-textbox1 ms-2'
                                                    name='Date_Of_Joining'
                                                    id='Date_Of_Joining'

                                                />
                                                
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} className='form-control mt-2 w-100'>
                                        <div>
                                            <h6 className='info-tag-h6'>Conatct Address k</h6>
                                        </div>
                                        <AddressComponent setAd={setAd} address={address} setDemoState={setDemoState} demoState={demoState} getAddress={location?.state?.[0]?.Address} />

                                        
                                        {console.log("hhhhhhhhh", demoState, personalInfo.Country)}
                                        <Row span={24}>
                                            <Col span={12}
                                                xs={24}
                                                sm={24}
                                                md={12}
                                                lg={12}>
                                                <Input
                                                    type="text"
                                                    placeholder="Country"
                                                    name="Country"
                                                    autoComplete="off"
                                                    id='Country'
                                                    value={demoState == true ? address.country : personalInfo.Country}
                                                    onChange={(e) => handleChangeContact(e)}
                                                    className='address-info-texbox2'
                                                    disabled={true}
                                                    style={{ color: "black" }}
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
                                                    name="State"
                                                    autoComplete="off"
                                                    value={demoState == true ? address.state : personalInfo.State}
                                                    id='State'
                                                    onChange={(e) => handleChangeContact(e)}
                                                    className='address-info-texbox2'
                                                    disabled={true}
                                                    style={{ color: "black" }}

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
                                                    name="City"
                                                    id='City'
                                                    autoComplete="off"
                                                    value={demoState == true ? address.city : personalInfo.City}
                                                    onChange={(e) => handleChangeContact(e)}
                                                    className='address-info-texbox3'
                                                    disabled={true}
                                                    style={{ color: "black" }}
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
                                                    autoComplete="off"
                                                    id='Pincode'
                                                    value={demoState == true ? address.zipcode : personalInfo.Pincode}
                                                    // value={location?.state?.[0]?.Pincode != "" && address?.addressLine1 != undefined  ? address.zipcode : location?.state?.[0]?.Pincode }
                                                    className='address-info-texbox4'
                                                    onChange={(e) => handleChangeContact(e)}
                                                    disabled={true}
                                                    style={{ color: "black" }}

                                                />
                                            </Col>

                                        </Row>

                                    </Col>
                                </Row>
                            </Col>

                        </Row>

                        {console.log("jkjkjkjsdsd", location?.state?.[0].length)}
                        <Row className="mt-2">
                            <Col span={24} className="d-flex justify-content-between">
                                <div>
                                    <Link to="/fourbox">
                                        <Button style={{ backgroundColor: "maroon", color: "white" }}>Back</Button>
                                        {/* <Commonbackbutton backButtonText={"Back"} backbuttonwidth={135} /> */}

                                    </Link>
                                </div>
                                <div>
                                    {/* <Commonbutton buttonText={"Save"} buttonwidth={135} /> */}
                                    <button style={{ backgroundColor: "maroon", color: "white",width:"60px",height:"30px",borderRadius:"5px",border:"none" }}
                                    // onClick={handleSubmit}
                                    >{location?.state?.[0].length != 0 && location?.state?.[0] != undefined  ? "Update" : "Save"} </button>

                                </div>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>

        </div >

    )
}

export default FieldMember
