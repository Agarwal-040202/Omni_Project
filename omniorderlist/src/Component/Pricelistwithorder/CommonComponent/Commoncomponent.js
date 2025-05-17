import React, { useEffect, useRef, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useLocation } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { data1 } from "../AllTableData/Tabeldata"
import "../CommonComponent/commoncomponnet.css"
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import html2canvas from 'html2canvas';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { v4 as uuidv4 } from "uuid"
import autoTableStyles from 'jspdf-autotable'
import { useDispatch, useSelector } from "react-redux"
import { getPriceListData } from "../../../Redux/Slice/priceLisleSlice/priceListSlice"
import { orderListDetails } from "../../../Redux/Slice/orderListSlice/orderListSaveSlice"

// import omnipdf from "../../../public/images/OmniBroucher2022.pdf"
import { useNavigate } from 'react-router-dom';

import { Select } from "antd"
const { Option } = Select;


const Commoncomponent = (props) => {

  const navigate = useNavigate();

  const { orderListDetailStatus, orderListDetailError } = useSelector((State) => State.addNewOrderData)

  const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""
  const shopKeepeerData = JSON.parse(sessionStorage?.getItem("shopKeeperData")) || ""
  const OrderTypemodeVariable = sessionStorage.getItem('OrderTypemode') || "";
  // console.log("dsffsf", shopKeepeerData?.Firm_Name, shopKeepeerData?.City, UserRole?.User_Name)

  // console.log("OrderTypemodeVariable", OrderTypemodeVariable)
  console.log("orderListDetailStatus", orderListDetailStatus)

  const linkDataProps = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef([])
  const inputSchemeRef = useRef([]);
  const searchInputRef = useRef(null)
  const { priceListData } = useSelector((state) => state);
  const [sorceVideo, setSourceVideo1] = useState('');
  const [getInput, setInput] = useState('');
  const [tableData, setTableData1] = useState([]);
  const [menuState, setMenuState] = useState('');
  const [screwName, setScrewName] = useState('');
  const [quantity, setQuantity] = useState(""); // Step 2: Initialize quantity state
  const [scheme, setScheme] = useState(''); // Step 3: Initialize scheme state
  const [orderList, setOrderList] = useState([]);
  const [userIDState, setUserIDState] = useState("")
  const [userCodeState, setUserCodeState] = useState("")
  const [checked, setChecked] = useState(false);
  const [showPopModalState, setShowPopModalState] = useState(false);
  const [showPdfModalState, setShowPdfModalState] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [shopkeeperName, setShopkeeperName] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [showOrderModalWithTypeState, setShowOrderModalWithTypeState] = useState(false)
  const [accordionInputs, setAccordionInputs] = useState({});
  const [selectedRadio, setSelectedRadio] = useState(""); // State to store the selected radio value
  const [searchInput, setSearchInput] = useState('');
  const [currentScrewName, setCurrentScrewName] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [orderListID, setOrderListID] = useState("")


  useEffect(() => {

    const orderListObject = {
      orderListID: '',
      orderNo: '',
      fieldMemberName: '',
      orderMode: '',
      stateName: '',
      firmName: '',
      City: '',
      Date_OrderList: '',
      orderObject: '',
      remark: '',
      fieldMemberID: ''
    }

    functionS()

  }, [linkDataProps?.state])

  useEffect(() => {

    setUserIDState(uuidv4())
    setOrderListID(uuidv4())
    // randemID.slice(0, 6)
  }, [])

  useEffect(() => {
    setUserCodeState(userIDState.slice(0, 3))
  }, [userIDState])

  console.log("orderListID", orderListID, UserRole?.User_Name)
  // Create a new Date object to represent the current date
  const currentDate = new Date();

  // Get the day, month, and year components
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const year = currentDate.getFullYear();

  // Create a formatted date string
  const formattedDate = `${day}/${month}/${year}`;

  const seconds = currentDate.getSeconds(); // Get the seconds component
  const orderno = seconds + userCodeState



  const functionS = () => {
    try {
      dispatch(getPriceListData(linkDataProps?.state));

    }
    catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    setSourceVideo1(data1[0]?.src)
    setSourceVideo1(data1[linkDataProps.state]?.src)
    setTableData1(data1[linkDataProps.state]?.dataMain)
    setTableData1(data1[0]?.dataMain)

    setMenuState(linkDataProps.state)
    setScrewName(priceListData?.priceListData?.data?.[0]?.Schrew_Name); // Set screwName

  }, [data1[linkDataProps.state]?.src])

  // Update inputRefs array when the number of input fields changes
  useEffect(() => {
    inputRef.current = Array(tableData.length).fill().map((_, i) => inputRef.current[i] || React.createRef());
    inputSchemeRef.current = Array(tableData.length).fill().map((_, i) => inputSchemeRef.current[i] || React.createRef());

  }, [tableData]);

  // Clear input fields when screwName changes
  useEffect(() => {
    inputSchemeRef.current.forEach((ref) => {
      if (ref.current) {
        ref.current.value = '';

      }
    });
    inputRef.current.forEach((ref) => {
      if (ref.current) {
        ref.current.value = '0';

      }
    });
    // searchInputRef.current.value=''
    setInput("")
  }, [screwName]);


  const searchData = (e) => {
    setInput(e.target.value)

  }

  useEffect(() => {
    if (priceListData && priceListData.priceListData && priceListData.priceListData.data) {
      const screwName = priceListData.priceListData.data[0].Schrew_Name;
      // Now you can use screwName
    }
  }, [priceListData]);



  const showOrderModal = () => {
    setShowModal(true)
  }

 

  const screws = {
    "screwName":
      [
        "CSK PHILLIPS",
        "CSK PHILLIPS ANTIQUE",
        "CSK PHILLIPS ROSEGOLD",
        "CSK PHILLIPS GOLDEN",
        "CSK PHILLIPS AUTO BLACK",
        "PAN PHILLIPS",
        "CSK SLOTTED",
        "PAN SLOTTED",
        "CSK SLOTTED WOOD",
        "CSK PHILLIPS WOOD",
        "DRYWALL 410",
        "DRYWALL 410 ANTIQUE",
        "DRYWALL 410 GOLDEN",
        "DRYWALL 410 ROSEGOLD",
        "DRYWALL 410 AUTO BLACK",
        "CSK PHILLIPS SDS 410",
        "PAN PHILLIPS SDS 410",
        "HEX SDS EPDM 410",
        "HEX SDS METAL BONDED EPDM",
        "FULLCUT 410",
        "FULLCUT 410 ANTIQUE",
        "FULLCUT 410 GOLDEN",
        "FULLCUT 410 ROSEGOLD",
        "FULLCUT 410 AUTO BLACK",
        "COMBI WITH WASHER SS",
        "CSK SLOTTED BSW THREAD",
        "CSK SLOTTED MM THREAD",
        "CSK PHILLIPS MM THREAD",
        "BLACK GYPSUM",
        "CHROME FINISH",
        "ZINC DRYWALL",
        "ZINC CHIPBOARD",
        "ZINC COMBI WITH WASHER MS",
        "CARRIAGE BOLTS 12 MM",
        "CARRIAGE BOLTS 12 MM ANTIQUE",
        "CARRIAGE BOLTS 12 MM GOLDEN",
        "CARRIAGE BOLTS 12 MM BLACK",
        "CARRIAGE BOLTS 14 MM",
        "KITCHEN BASKET SCREW",
        "NAILS HEADLESS",
        "NAILS ROUND HEAD",
        "MACHINE SCREW (-)",
        "MACHINE SCREW (+)",
        "MACHINE SCREW ANTIQUE (+)",
        "Washer",
        "NUT",
        "ZINC SDS",
        "ZINC TRUSS SDS",
        "ZINC HEX HEAD",
        "BIT"

      ]
  }



  const showOrderModalWithType = () => {
    setShowOrderModalWithTypeState(true)
  }

  const handelcloseModalWithType = () => {
    setShowOrderModalWithTypeState(false)
  }

  const handleShopkeeperNameChange = (e) => {
    setShopkeeperName(e.target.value);
  };

  const handleStateNameChange = (e) => {
    setStateName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };


  const handleAccordionTextareaChange = (index, value) => {
    const trimmedValue = value;
    if (trimmedValue !== '') {
      setAccordionInputs((prevState) => ({
        ...prevState,
        [index]: trimmedValue,
      }));
    } else {
      setAccordionInputs((prevState) => {
        const { [index]: omit, ...updatedState } = prevState;
        return updatedState;
      });
    }
  };


  //new code 15/4/25

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 10;
  
    const drawBorder = () => {
      const margin = 2;
      doc.setLineWidth(1);
      doc.setDrawColor(0, 0, 0);
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    };
  
    const addNewPage = () => {
      doc.addPage();
      drawBorder();
      yPosition = 10;
    };
  
    drawBorder();
  
    const definedIndices = Object.keys(accordionInputs).filter(index => accordionInputs[index] !== undefined);
  
    // Title
    doc.setTextColor(128, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Omni Screw Orderlist', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 14;
  
    // Order Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
  
    doc.text(`Order No: ${orderno}`, 15, yPosition);
    const dateText = `Date: ${formattedDate}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - dateTextWidth - 15, yPosition);
    yPosition += 7;
  
    doc.text(`Order By: ${UserRole?.User_Name}`, 15, yPosition);
    const orderModeText = `Order Mode: ${checked ? 'Phone' : 'Visit'}`;
    const orderModeTextWidth = doc.getTextWidth(orderModeText);
    doc.text(orderModeText, pageWidth - orderModeTextWidth - 15, yPosition);
    yPosition += 7;
  
    doc.text(`State Name: ${stateName.toUpperCase()}`, 15, yPosition);
    yPosition += 7;
  
    doc.text(`Firm Name: ${shopkeeperName.toUpperCase()}`, 15, yPosition);
    yPosition += 7;
  
    doc.text(`City: ${city.toUpperCase()}`, 15, yPosition);
    yPosition += 10;
  
    // Loop through screws
    definedIndices.forEach((index, i) => {
      const screw = screws.screwName[index];
      const textareaValue = accordionInputs[index];
      const lines = doc.splitTextToSize(textareaValue, pageWidth - 40);
      let remainingLines = [...lines];
  
      while (remainingLines.length > 0) {
        const minRequiredSpace = 7 + (remainingLines.length * 5);
        if (yPosition + minRequiredSpace > pageHeight - 10) {
          addNewPage();
        }
  
        // Screw name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(204, 0, 0);
        doc.text(`${screw}`, 15, yPosition);
        yPosition += 7;
  
        // Screw details
        const availableLines = Math.floor((pageHeight - yPosition - 10) / 5);
        const linesToRender = remainingLines.slice(0, availableLines);
  
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(linesToRender, 20, yPosition);
        yPosition += linesToRender.length * 5;
  
        remainingLines = remainingLines.slice(availableLines);
  
        if (remainingLines.length > 0) {
          addNewPage();
        }
      }
  
      yPosition += 3;
  
      if (i < definedIndices.length - 1 && yPosition + 30 > pageHeight - 10) {
        addNewPage();
      }
    });
  
    // Remarks section
    if (formattedText) {
      if (yPosition + 30 > pageHeight - 10) {
        addNewPage();
      }
  
      yPosition += 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(128, 0, 0);
      doc.text(`REMARKS:`, 15, yPosition);
      yPosition += 5;
  
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      const remarksLines = doc.splitTextToSize(formattedText, pageWidth - 30);
      doc.text(remarksLines, 15, yPosition);
      yPosition += remarksLines.length * 5;
    }
  
    // Save order object
    const firmName = shopkeeperName.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    const formattedCity = city.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  
    const orderListObject = {
      orderListID: orderListID,
      orderNo: orderno,
      fieldMemberName: UserRole?.User_Name,
      orderMode: checked ? 'Phone' : 'Visit',
      stateName: stateName,
      firmName: firmName,
      City: formattedCity,
      Date_OrderList: formattedDate,
      orderObject: accordionInputs,
      remark: formattedText,
      fieldMemberID: UserRole?.User_Id
    };
  
    dispatch(orderListDetails(orderListObject));
    console.log("orderListObject111", orderListObject);
  
    const baseFileName = `${shopkeeperName} (${city})`;
    const fileName = `${baseFileName}.pdf`;
  
    doc.save(fileName);
    handelcloseModalWithType();
    window.location.reload();
  };
  

  //new code end 15/4/25
  
    const showPOPModalFunction = () => {
    setShowPopModalState(true)
  }

  const handlePOPClose = () => {
    setShowPopModalState(false)

  }

  const showPdfModalFunction = () => {
    setShowPdfModalState(true)

  }

  const handlePdfClose = () => {
    setShowPdfModalState(false)

  }

  
  let totalCount = 0;

  // Iterate through each screwName key and add the length of the array to totalCount
  Object.keys(orderList).forEach((screwName) => {
    totalCount += orderList[screwName].length;

  });

  useEffect(() => {
    if (currentScrewName !== '') {
      inputSchemeRef.current.forEach((ref, i) => {
        if (ref.current) {
          ref.current.value = '';
        }
      });

      inputRef.current.forEach((ref, i) => {
        if (ref.current) {
          ref.current.value = '0';
        }
      });

      setSearchInput(''); // Reset searchInput
      setInput('');
      // setUpdateInfoState(''); // Reset updateInfoState
    }
  }, [currentScrewName]);


  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };


  const addPopFunction = () => {
    setFormattedText(textareaValue.toUpperCase());
    handlePOPClose()

  }


  const hasNonEmptyValue = Object.values(accordionInputs).some(value => value.trim() !== '');

  console.log("accordionInputs", accordionInputs)

  return (
    <div>

      {/* Remark MODAL CODE START */}
      {
        showPopModalState == true &&
        <Modal show={showPopModalState}
          onHide={handlePOPClose}
          centered
          backdrop={false}
          size="lg"
          style={{ zIndex: 9 }}
        >
          <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
            <Modal.Title style={{ color: "white" }}>Omni Remark List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4 className='firmname-tag-h6'>Remark</h4>
              <textarea
                rows="5"
                className='w-100 p-1'
                style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                placeholder="Enter your pop list here..."
                value={textareaValue}
                onChange={handleTextareaChange}
              ></textarea>
            </div>
            <div className='d-flex justify-content-end'>

              <button
                onClick={addPopFunction}
                style={{
                  backgroundColor: "green", color: "white",
                  borderRadius: "5px", border: "none", fontSize: "16px", height: "36px", width: "60px", float: "right",
                  fontWeight: "500"
                }}
              >Add</button>
            </div>
          </Modal.Body>
        </Modal>
      }

      {/* Remark MODAL CODE END */}

      {/* VIEW THE PDF MODAL CODE START  */}

      {
        showPdfModalState == true &&
        <Modal show={showPdfModalState}
          onHide={handlePdfClose}
          centered
          backdrop={false}
          style={{ zIndex: 9 }}
          size="lg"

        >
          <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
            <Modal.Title style={{ color: "white" }}>View Omni Order List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            </div>

            <div className="position-relative" style={{ height: "200px", overflowY: "scroll" }}>
              <div>
                {Object.keys(accordionInputs).map((index) => (
                  accordionInputs[index].trim() !== '' && (
                    <div key={index}>
                      <div style={{ fontWeight: "bold" }}>{screws.screwName[index]}</div>
                      {accordionInputs[index].split('\n').map((data, i, arr) => (
                        <React.Fragment key={i}>
                          <div style={{ color: "maroon", fontWeight: "500" }}>{data.toUpperCase()}
                            {i !== arr.length - 1 && <br />}
                          </div>
                        </React.Fragment>
                      ))}
                      <br />
                    </div>
                  )
                ))}
              </div>
            </div>

          </Modal.Body>
        </Modal>

      }

      {/* VIEW THE PDF MODAL CODE END */}

      {/* MANUAL MODE MODAL CODE START */}

      {
        showOrderModalWithTypeState == true &&
        <Modal show={showOrderModalWithTypeState}
          onHide={handelcloseModalWithType}
          centered
          backdrop={false}
          size="lg"
          style={{ zIndex: 9 }}
        >
          <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
            <Modal.Title style={{ color: "white" }}>Omni Order List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>

              <h4 className='firmname-tag-h6'>Shopkeeper Details</h4>

              <div>
              <input
                  type='text'
                  placeholder='Enter State Name'
                  className='w-100'
                  value={stateName}
                  onChange={handleStateNameChange}
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginBottom: stateName !== "" ? "10px" : "0px",
                    outline: "none",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    textTransform: 'uppercase'
                  }}
                />
                {(stateName === "") && (
                  <div >
                    <h6 style={{ marginLeft: "3px", color: "red" }}>State name is required.</h6>
                  </div>
                )}



                <input
                  type='text'
                  placeholder='Enter Firm Name'
                  className='w-100'
                  value={shopkeeperName}
                  onChange={handleShopkeeperNameChange}
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginBottom: shopkeeperName !== "" ? "10px" : "0px",
                    outline: "none",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    textTransform: 'uppercase'
                  }}
                />
                {(shopkeeperName === "") && (
                  <div >
                    <h6 style={{ marginLeft: "3px", color: "red" }}>Firm name is required.</h6>
                  </div>
                )}

                <input
                  type='text'
                  placeholder='Enter city name'
                  className='w-100'
                  value={city}
                  onChange={handleCityChange}
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginBottom: city !== "" ? "10px" : "0px",
                    outline: "none",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    textTransform: 'uppercase'

                  }}
                />

                {(city === "") && (
                  <div >
                    <h6 style={{ marginLeft: "3px", color: "red", }}>City name is required.</h6>
                  </div>
                )}
              </div>

              {console.log("hkjhkjlolohkhk", shopkeeperName, city)}

              <div className='d-flex justify-content-between mt-2'>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <h4 className='firmname-tag-h6'>Order Details</h4>
                </div>

                {(hasNonEmptyValue && stateName !== "" && shopkeeperName !== "" && city !== "") && (
                  <div style={{ width: "36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="/pdfview.png" className='img-fluid' style={{ cursor: "pointer" }} onClick={showPdfModalFunction} />
                  </div>
                )}
              </div>

              <div className="position-relative mt-1" style={{ height: "200px", "overflow-y": "scroll" }}>

                <div className="accordion" id="accordionExample" style={{ width: "98%" }}>
                  {screws.screwName.map((screw, index) => (
                    <div className="accordion-item my-2" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <div className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                          {screw}
                        </div>
                      </h2>
                      <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <textarea
                            rows="5"
                            className='w-100 p-1'
                            style={{ fontWeight: 'bold', border: "none" }}
                            placeholder="Enter your order here..."
                            value={accordionInputs[index]}
                            onChange={(e) => handleAccordionTextareaChange(index, e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <div className='d-flex justify-content-between mt-3'>
              <button
                onClick={showPOPModalFunction}
                disabled={(hasNonEmptyValue && stateName !== "" && shopkeeperName !== "" && city !== "") ? false : true}
                style={{
                  backgroundColor: "blue", color: "white",
                  borderRadius: "5px", border: "none", fontSize: "14px", height: "34px", width: "64px", float: "right"
                }}
              >Remark
              </button>
              <button
                onClick={handleGeneratePDF}
                disabled={(hasNonEmptyValue && stateName !== "" && shopkeeperName !== "" && city !== "") ? false : true}
                style={{
                  backgroundColor: "green", color: "white",
                  borderRadius: "5px", border: "none", fontSize: "14px", height: "34px", width: "106px", float: "right"
                }}
              >Genrate Order</button>
            </div>
          </Modal.Body>
        </Modal>
      }
      {/* MANUAL MODE MODAL CODE END */}


      {console.log("linklkkjkj", linkDataProps?.state)}
      <div className="Main-Layoyt-Div py-1 pb-2 px-3">

        {
          linkDataProps?.state == 1111 || linkDataProps.state == 1 || linkDataProps.state == 7 || linkDataProps.state == 14 ? <div>
            <video src={linkDataProps.state == 1111 ? "/videodata/CskPhillips.mp4" : linkDataProps.state == 1 ? "/videodata/CskPhillips.mp4" : linkDataProps.state == 7 ? "/videodata/DrywellScrews410.mp4" : linkDataProps.state == 14 ? "/videodata/FullCut410.mp4" : ""} muted autoPlay={"autoplay"}
              poster="./Jacobandbella.jpg" preLoad="auto" loop className='w-100 video-class'>
              video tag is not supported by your browser</video>
          </div> :
            linkDataProps.state == 2 || linkDataProps.state == 3 || linkDataProps.state == 4 || linkDataProps.state == 5 || linkDataProps.state == 6 ||
              linkDataProps.state == 10 || linkDataProps.state == 11 ?

              <div style={{ backgroundColor: "white", height: "auto" }}>
                <img src={linkDataProps.state == 2 ? "https://www.omniscrews.com/wp-content/uploads/2016/10/S.S.-C.S.K.-Pan-Phillips-Self-Taping-Screws.jpg"
                  : linkDataProps.state == 3 || linkDataProps.state == 4 ? "https://www.omniscrews.com/wp-content/uploads/2016/10/S.S.-C.S.K.-Pan-Sloted-Self-Taping-Screws-2.jpg"
                    : linkDataProps.state == 5 ? "https://www.omniscrews.com/wp-content/uploads/2016/10/S.S.-C.S.K.-Phillips-Self-Tapping-Wood-Screws-2.jpg"
                      : linkDataProps.state == 6 ? "https://www.omniscrews.com/wp-content/uploads/2016/10/Ss...jpg"
                        : linkDataProps.state == 10 || linkDataProps.state == 11 ? "https://www.omniscrews.com/wp-content/uploads/2017/09/bannerPicOmni.jpg" : ""} className='img-fluid' />

              </div>
              :
              <div style={{ backgroundColor: "white", height: "auto" }}>

                <img src="/main-banner11.jpg" className='img-fluid' />

              </div>
        }

        <Row>
          <Col xs={12} sm={12} lg={12} className="d-flex justify-content-start align-items-center">
            <div className="d-flex justify-content-start align-items-center pt-2">
              <h6 className='screwName-class'>{
                priceListData?.priceListData?.data?.[0]?.Schrew_Name
              }</h6>
            </div>
          </Col>
        </Row>
        <Row className=' mb-1'>

          <Col xs={8} sm={8} lg={8} className="d-flex justify-content-end">
            <div className='search_input-div w-100'>
              <div className='w-100'>
                <Form.Control

                  size="sm" type="text" placeholder="Search Size" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
              </div>
              <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
                <img src="/searchicon2.png" className='w-75' />
              </div>
            </div>
          </Col>
          
          <Col xs={3} sm={3} lg={3} className="d-flex justify-content-center align-items-center m-0 p-0">

            <ButtonGroup >
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant={checked ? 'success' : 'secondary'}
                checked={checked}
                value="1"
                onChange={(e) => setChecked(e.currentTarget.checked)}
                className="toggle-switch d-flex justify-content-center align-items-center"
                style={{ paddingBottom: "7px" }}
              >
                Phone
              </ToggleButton>
            </ButtonGroup>
          </Col>
          <Col xs={1} sm={1} lg={1} className="d-flex justify-content-end">

            {
              OrderTypemodeVariable == "OrderTypemode" ? <>

                <div className='d-flex justify-content-end align-items-center' style={{ width: "40px" }} >
                  <img src="/notepad1.jpg" style={{ width: "22px", cursor: "pointer" }} onClick={showOrderModalWithType} />

                </div>


              </> : ""
            }

            {
              OrderTypemodeVariable != "OrderTypemode" ? <>

                <div className='d-flex justify-content-end align-items-center' style={{ width: "40px" }} >
                  {/* <button onClick={showOrderModal}>order</button> */}
                  {totalCount > 0 ? <>
                    <img src="/takeorder1.webp" style={{ width: "22px", cursor: "pointer" }} onClick={showOrderModal} /> </>
                    : ""
                  }

                </div>
              </> : ""
            }


          </Col>
        </Row>
        <div className="m-0 p-0 table-main-div heughtset">

          <Table bordered className='m-0 p-0' id="HtmlToPdf" responsive>

            <thead className='bg-light' style={{ position: "sticky", top: "-2px", background: "white", zIndex: "5", height: "40px", }}>
              <tr >
                <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>Size</th>
                <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>Packing</th>
                <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                  <img src="/rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} onError={(e) => console.log('Error loading image:', e)} />
                  {" "} 100</th>
              </tr>

            </thead>
            {priceListData?.priceListData?.data?.filter(data => data?.Size?.toLowerCase().includes(getInput.toLowerCase())).map((data, index) => {
             

              return (
                <tr style={{ backgroundColor: "" }} className="tabel-row" key={index}>

                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Size}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Packing}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Price}</td>
                 

                </tr>
              )
            })
            }

          </Table>

        </div>

      </div>

    </div >
  )
}

export default Commoncomponent