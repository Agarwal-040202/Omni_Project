import React, { useState, useRef, useContext, useImperativeHandle, forwardRef } from 'react'
import { Col, Row, Input } from "antd";
import MyContext from '../../MyContext';
const addressInfoObj = () => {
    return { Address1: "", addressLine2: "", Pincode: "", City: "", State: "", Country: "", county: "", Village_Street: '' }
}
const AddressComponentNew = ({ setNewContactInfo }, ref) => {
    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const inputSearchaddressRef = useRef(null)
    const [addressInfo, setaddressInfo] = useState({ ...addressInfoObj() })
    const loginUserId = sessionStorage.getItem("loggedUserId");
    const [showClearButton,setShowshowClearButton]=useState(false)
    // console.log('addressInfoaddressInfo',showClearButton, addressInfo)

    useImperativeHandle(ref, () => ({
        checkvalidation, updateAddressFun
    }))

    const checkvalidation = () => {
        const { Address1, Pincode, City, State, Country, Village_Street } = addressInfo
        // console.log('Address1Address1', Address1)
        if (showClearButton ==false  || Address1 == undefined || Address1 == '' || Address1 == null) {
            handleShopToast(true, 'Error', "Address can't be black");
            return true
        }
        if (State == undefined || State == '' || State == null) {
            handleShopToast(true, 'Error', "State can't be black");
            return true

        }
        if (City == undefined || City == '' || City == null) {
            handleShopToast(true, 'Error', "City can't be black");
            return true

        }
        if (Country == undefined || Country == '' || Country == null) {
            handleShopToast(true, 'Error', "Country can't be black");
            return true

        }
        if (Pincode == undefined || Pincode == '' || Pincode == null) {
            handleShopToast(true, 'Error', "Pincode can't be black");
            return true

        }

        return false
    }
    const updateAddressFun = (address) => {

        inputSearchaddressRef.current.value = address.Address1
        funForAddressStateUpdate('', '', address)
        setShowshowClearButton(true)

    }

    const onhandleChangeAddress = () => {
        initMapScript().then(() => initAutoComplete());
        if (inputSearchaddressRef.current.value !== "") {
            setShowshowClearButton(true)
            if (inputSearchaddressRef.current.value > 0) {
                // showClearButton = true;
            }
        } else {
            setShowshowClearButton(false)
        }
    };

    const initAutoComplete = () => {
        if (!inputSearchaddressRef.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(inputSearchaddressRef.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () =>
            onChangeAddress(autocomplete)
        );
    };

    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        const lat = place?.geometry?.location?.lat();
        const long = place?.geometry?.location?.lng();
        funForAddressInfo(extractAddress(place))
    };



    const funForAddressInfo = (address) => {
        // console.log("dfsfsfsfsf",address)
        const addressInfoDet = {
            City: address?.City,
            county: address?.county,
            State: address?.State,
            Pincode: address?.zip,
            Country: address?.country,
            addressLine2: "",
            Address1: inputSearchaddressRef?.current?.value,
            createdBy: loginUserId,
            Village_Street: inputSearchaddressRef?.current?.value.substring(0, inputSearchaddressRef?.current?.value.indexOf(",")),
            addressTypeId: 1
        };
        setNewContactInfo({ ...addressInfoDet })
        setaddressInfo({ ...addressInfoDet });
    };


    const handleChangeInput = (e) => {
        const { value, id } = e.target
        // console.log(value, id, 'valueid')
        funForAddressStateUpdate(id, value)

    }


    const funForAddressStateUpdate = (key, value, address) => {

       
        if (key == '' && value == '') {
            setaddressInfo(prev => ({
                ...prev, ...address
            }))
            setNewContactInfo(prev => ({
                ...prev, ...address
            }))
        } else {
            setaddressInfo(prev => ({
                ...prev, [key]: value
            }));
            setNewContactInfo(prev => ({
                ...prev, [key]: value
            }));
        }

    }

    return (
        <Row>

            <Col span={24} className='form-control mt-2 w-100'>
                <div>
                    <h6 className='info-tag-h6'>Conatct Address New</h6>
                </div>
                <Row>
                    <Col span={24} className="w-100">
                        <input
                            onChange={() => onhandleChangeAddress()}
                            ref={inputSearchaddressRef}
                            type="text"
                            placeholder="Enter Primary Address"
                            name="Address"
                            id="Address1"
                            className="address-info-textbox"
                            style={{ width: "100%", paddingLeft: "10px" }}

                        />
                    </Col>
                </Row>
                <Row span={24} className=''>
                    <Col span={12} xs={24} sm={24} md={12} lg={12}>
                        <Input type="text" placeholder="Country" name="Country" id='Country' autoComplete="off" className='address-info-texbox2'
                            value={addressInfo.Country} onChange={(e) => handleChangeInput(e)}
                            style={{ color: "black" }} />
            
                    </Col>
                    <Col span={12} xs={24} sm={24} md={12} lg={12} className='d-flex justify-content-end'>
                        <Input type="text" placeholder="State" id='State' name='State' autoComplete="off" className='address-info-texbox2'
                            value={addressInfo.State} onChange={(e) => handleChangeInput(e)} style={{ color: "black" }} />
                    </Col>
                </Row>
                <Row span={24} className=''>
                    <Col span={12} xs={24} sm={24} md={12} lg={12}>
                        <Input type="text" placeholder="City" name='City' id='City' autoComplete="off" className='address-info-texbox3'
                            value={addressInfo.City} onChange={(e) => handleChangeInput(e)} style={{ color: "black" }} />
                    </Col>
                    <Col span={12} xs={24} sm={24} md={12} lg={12} className='d-flex justify-content-end'>
                        <Input type="text" placeholder="Pincode" name="Pincode" id='Pincode' autoComplete="off" className='address-info-texbox5'
                            value={addressInfo.Pincode} onChange={(e) => handleChangeInput(e)}

                            style={{ color: "black" }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='w-100'>
                        <Input type="text" placeholder="Enter the Village or Street Adress" name="Village_Street" id='Village_Street'
                            value={addressInfo.Village_Street} onChange={(e) => handleChangeInput(e)}
                            autoComplete="off" className='address-info-textbox6' />
                    </Col>

                </Row>
            </Col>
        </Row>
    )
}


const mapApi = "https://maps.googleapis.com/maps/api/js";


function loadAsyncScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}



function initMapScript() {
    if (window.google) {
        return Promise.resolve();
    }
    const src = `${mapApi}?key=${'AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI'}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
}

function extractAddress(place) {
    const address = {
        City: "",
        State: "",
        zip: "",
        county: "",
        Country: "",
        plain() {
            const City = this.City ? this.City + ", " : "";
            const zip = this.zip ? this.zip + ", " : "";
            const county = this.county ? this.county + "," : "";
            const State = this.State ? this.State + ", " : "";
            return City + zip + State + this.Country;
        },
    };

    if (Array.isArray(place?.address_components)) {
        place.address_components.forEach((component) => {
            const types = component.types;
            const value = component.long_name;

            address.City = types.includes("locality") ? value : address?.City;
            address.State = types.includes("administrative_area_level_1") ? value : address?.State;
            address.county = types.includes("administrative_area_level_2") ? value : address?.county;
            address.zip = types.includes("postal_code") ? value : address?.zip;
            address.Country = types.includes("Country") || types.includes("Country") ? value : address?.Country;
        });
    }
    return address;
};






export default forwardRef(AddressComponentNew)