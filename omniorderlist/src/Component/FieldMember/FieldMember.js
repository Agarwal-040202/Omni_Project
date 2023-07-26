import React, { useState, useContext, useEffect } from 'react'
import { Col, Row, Input, Button } from "antd";
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
    return { Gender: '', Nationality: '', MaritalStatus: "", Qualification: '', DOJ: '' }
}
const newObjContact = () => {
    return { Address: "", Country: '', State: '', City: '', Pincode: '' }
}

const FieldMember = () => {

    
    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAd] = useState({})

    console.log("kjkhhh", address)


    const [personalInfo, setPersonalInfo] = useState({ ...newObjPersonal() })
    const [contactInfo, setContactInfo] = useState({ ...newObjContact() })
    const [userDetailState, setUserDetailState] = useState(personalInfo , contactInfo)
    const [getStatusState, setStatusState] = useState(false)
    const { fileldMemberDetailStatus, fileldMemberDetailError } = useSelector((State) => State.fieldMemberDetail)

    console.log('personalInfo', fileldMemberDetailError, fileldMemberDetailStatus)


    const location = useLocation()
    const userID = sessionStorage?.getItem("loggedUserId") || ""
    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""


    console.log("location", location?.state?.[0]?.Address)

    const userFirstname = UserRole?.User_Name?.trim()?.split(" ")[0];
    const wordsArray = UserRole?.User_Name?.split(" ");
    const userLastname = wordsArray && wordsArray.length > 1 ? wordsArray[1]?.trim() || " " : " ";


    useEffect(() => {
        if (getStatusState == true) {
            callFunction()
        }
    }, [fileldMemberDetailStatus])


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
        let { Gender, Nationality, MaritalStatus, Qualification, DOJ } = personalInfo;
        let { Address, Country, State, City, Pincode } = contactInfo;

        switch (true) {
            case Gender === '':
                errMsg = 'Please select Gender';
                break;
            case Nationality === '':
                errMsg = 'Please select Nationality';
                break;
            case MaritalStatus === '':
                errMsg = 'Please select marital status';
                break;
            case Qualification === '':
                errMsg = 'Please select Qualification';
                break;
            case DOJ === '':
                errMsg = 'Please select DOJ';
                break;
            case Address === '':
                errMsg = 'Please select Address';
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
            default:
                return true;
        }

        handleShopToast(true, 'Error', errMsg);
        return false;
    };

    console.log("dddddd",personalInfo,contactInfo)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const obj = { FieldMemberID: userID, FieldMember_Firstname: userFirstname, FieldMember_LastName: userLastname, FieldMember_EmailID: UserRole.Email_Id, FieldMember_Role: UserRole.User_Role, FieldMember_Contact: UserRole.Contact, ...personalInfo, ...contactInfo }
       console.log(obj,"obj")
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
                                            defaultValue={UserRole.Email_Id}
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
                                            defaultValue={UserRole.User_Role}
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
                                                    defaultValue={userFirstname}
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
                                                    defaultValue={userLastname}
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
                                                    onChange={(e) => handleChangeInput(e)}
                                                    // value={personalInfo.Gender}
                                                    defaultValue={location?.state?.[0]?.Gender == "" ? personalInfo.Gender : location?.state?.[0]?.Gender}

                                                >
                                                    <option value='' disabled selected hidden>Gender</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </Form.Select>

                                                
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
                                                    placeholder="Nationality"
                                                    name="Nationality"
                                                    id='Nationality'
                                                    autoComplete="off"
                                                    defaultValue={location?.state?.[0]?.Nationality == "" ? personalInfo.Nationality : location?.state?.[0]?.Nationality}
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
                                                    // value={personalInfo.MaritalStatus}
                                                    defaultValue={location?.state?.[0]?.MaritalStatus == "" ? personalInfo.MaritalStatus : location?.state?.[0]?.MaritalStatus}

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
                                                    // value={personalInfo.Qualification}
                                                    defaultValue={location?.state?.[0]?.Qualification == "" ? personalInfo.Qualification : location?.state?.[0]?.Qualification}

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
                                                className='d-flex justify-content-end'

                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Date of joining"
                                                    autoComplete="off"
                                                    name='Date_Of_Joining'
                                                    id='DOJ'
                                                    value={personalInfo.DOJ}
                                                    onChange={(e) => handleChangeInput(e)}
                                                    className='personal-ingo-textbox1'

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
                                        <AddressComponent setAd={setAd} address={address} />

                                        {/* <Row>
                                            <Col span={24} className='w-100'>

                                                <Input
                                                    type="text"
                                                    placeholder="Enter Pramry Address"
                                                    name="Address"
                                                    // autoComplete="off"
                                                    id='Address'
                                                    // value={contactInfo.Address}
                                                    onChange={(e) => handleChangeContact(e)}
                                                    className='address-info-textbox'
                                                    defaultValue={location?.state?.[0]?.Address == "" ? contactInfo?.Address : location?.state?.[0]?.Address}
                                                />
                                            </Col>

                                        </Row> */}

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
                                                    // value={contactInfo.Country}
                                                    defaultValue={location?.state?.[0]?.Country == "" ? contactInfo?.Country : location?.state?.[0]?.Country}

                                                    onChange={(e) => handleChangeContact(e)}
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
                                                    name="State"
                                                    autoComplete="off"
                                                    // value={contactInfo.State}
                                                    defaultValue={location?.state?.[0]?.State == "" ? contactInfo.State : location?.state?.[0]?.State}

                                                    id='State'
                                                    onChange={(e) => handleChangeContact(e)}
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
                                                    name="City"
                                                    id='City'
                                                    autoComplete="off"
                                                    // value={contactInfo.City}
                                                    defaultValue={location?.state?.[0]?.City == "" ? contactInfo.City : location?.state?.[0]?.City}

                                                    onChange={(e) => handleChangeContact(e)}
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
                                                    autoComplete="off"
                                                    id='Pincode'
                                                    // value={contactInfo.Pincode}
                                                    defaultValue={location?.state?.[0]?.Pincode == "" ? contactInfo.Pincode : location?.state?.[0]?.Pincode}

                                                    className='address-info-texbox4'
                                                    onChange={(e) => handleChangeContact(e)}

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
                                    <Link to="/fourbox">
                                        <Button style={{ backgroundColor: "maroon", color: "white" }}>Back</Button>
                                        {/* <Commonbackbutton backButtonText={"Back"} backbuttonwidth={135} /> */}

                                    </Link>
                                </div>
                                <div>
                                    {/* <Commonbutton buttonText={"Save"} buttonwidth={135} /> */}
                                    <button style={{ backgroundColor: "maroon", color: "white" }}
                                    // onClick={handleSubmit}
                                    >Save</button>

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
