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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { v4 as uuidv4 } from "uuid"
import autoTableStyles from 'jspdf-autotable'
import { useDispatch, useSelector } from "react-redux"
import { getPriceListData } from "../../../Redux/Slice/priceLisleSlice/priceListSlice"
// import omnipdf from "../../../public/images/OmniBroucher2022.pdf"
import { useNavigate } from 'react-router-dom';

import { Select } from "antd"
const { Option } = Select;




const Commoncomponent = (props) => {

  const navigate = useNavigate();


  const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""
  const shopKeepeerData = JSON.parse(sessionStorage?.getItem("shopKeeperData")) || ""

  // console.log("dsffsf", shopKeepeerData?.Firm_Name, shopKeepeerData?.City, UserRole?.User_Name)

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
  const [getInput1, setInput1] = useState("");
  const [userIDState, setUserIDState] = useState("")
  const [userCodeState, setUserCodeState] = useState("")
  const [checked, setChecked] = useState(false);
  const [showPopModalState, setShowPopModalState] = useState(false);
  const [showModal, setShowModal] = useState(false)

  // console.log("priceListDatafff", checked, priceListData?.priceListData?.data)

  useEffect(() => {
    functionS()
  }, [linkDataProps?.state])

  useEffect(() => {
    setUserIDState(uuidv4())
    // randemID.slice(0, 6)
  }, [])

  useEffect(() => {
    setUserCodeState(userIDState.slice(0, 3))
  }, [userIDState])

  // const outputString = userCodeState.replace(/[a-zA-Z]/g, '');

  // console.log("userIDState", userCodeState)

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

  // console.log("seconds", currentDate); // Output: The current seconds value (e.g., 0, 1, 2, ... 59)


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


  // console.log("linkDataPropsllll", linkDataProps.state)


  // console.log("linksdfdsf", menuState)

  const searchData = (e) => {
    setInput(e.target.value)

  }
  // console.log("lkjljkljl", getInput)

  useEffect(() => {
    if (priceListData && priceListData.priceListData && priceListData.priceListData.data) {
      const screwName = priceListData.priceListData.data[0].Schrew_Name;
      // Now you can use screwName
    }
  }, [priceListData]);


  // Function to add an item to the order list
  const addToOrderListFunction = (data) => {
    const screwName = priceListData?.priceListData?.data?.[0]?.Schrew_Name;

    // Check if the screwName already exists in orderList, if not, initialize it with an empty array
    if (!orderList[screwName]) {
      orderList[screwName] = [];
    }

    // Check if an item with the same Size already exists in the order list
    const existingItemIndex = orderList[screwName].findIndex((item) => item.Size === data.Size);

    if (existingItemIndex !== -1) {
      // Item with the same Size already exists, update it
      orderList[screwName][existingItemIndex] = {
        ...orderList[screwName][existingItemIndex],
        Quantity: quantity,
        Scheme: scheme,
      };

    } else {
      // Item with the same Size doesn't exist, add a new item
      orderList[screwName].push({
        screwName: screwName,
        Size: data.Size,
        Quantity: quantity,
        Scheme: scheme,
      });

    }

    // Update the order list state
    setOrderList({ ...orderList });

    // Clear the input fields after adding/updating the item
    inputRef.current.value = ""
    setQuantity("");
    setScheme('');

    setCurrentScrewName(screwName);
  };


  // console.log("ppuretyuiouy", JSON.stringify(orderList, null, 2));
  // console.log("sdfsdfs", orderList)

  const removeFromOrderListFunction = (screwName, index) => {
    setOrderList((prevOrderList) => {
      const updatedList = {
        ...prevOrderList,
        [screwName]: prevOrderList[screwName].filter((item, i) => i !== index),
      };

      // If the updated array's length is 0, remove the screwName key
      if (updatedList[screwName].length === 0) {
        delete updatedList[screwName];
      }

      return updatedList;
    });
  };


  // console.log("orderList", orderList)

  const [showOrderModalWithTypeState, setShowOrderModalWithTypeState] = useState(false)

  const showOrderModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)

  }

  const showOrderModalWithType = () => {
    setShowOrderModalWithTypeState(true)
  }

  const handelcloseModalWithType = () => {
    setShowOrderModalWithTypeState(false)
  }


  const showPOPModalFunction = () => {
    setShowPopModalState(true)
  }

  const handlePOPClose = () => {
    setShowPopModalState(false)

  }

  const [loader, setLoader] = useState(false)

  const generatePDF = (orderList, orderno) => {
    const doc = new jsPDF();
    let yPosition = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const itemsPerPage = 40; // Adjust this based on your layout and font size

    // Title
    doc.setFontSize(16);
    // doc.setTextColor(176, 48, 96);
    doc.setTextColor(128, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Omni Screw Order', pageWidth / 2, yPosition, { align: 'center' });
    doc.setTextColor(0);
    yPosition += 10;

    // Order details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const orderByText = `Order No: ${orderno}, Order By: ${UserRole?.User_Name}, Order Mode: ${checked ? 'Phone' : 'Visit'}`;
    doc.text(orderByText, 15, yPosition);

    const shopKeeperData = `Firm Name: ${shopKeepeerData?.Firm_Name}, City: ${shopKeepeerData?.City}, Date: ${formattedDate}`;
    yPosition += 7;
    doc.text(shopKeeperData, 15, yPosition);
    yPosition += 10;


    Object.keys(orderList).forEach((screwName, index) => {

      // const updatedInfo = updateInfo(screwName, orderList[screwName].Info);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${screwName}`, 15, yPosition);
      yPosition += 7;

      let itemsCount = 0;

      orderList[screwName].forEach((item, i) => {
        if (itemsCount < itemsPerPage) {
          const itemText = `${item.Size} - ${item.Quantity.toUpperCase()} ${item.Scheme}`;
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(itemText, 20, yPosition);
          yPosition += 6;
          itemsCount++;
        } else {
          // Move to the next page
          doc.addPage();
          yPosition = 10; // Reset yPosition for the new page
          itemsCount = 0;
        }
      });

      yPosition += 1;
    });

    // end 


    if (formattedText != "") {
      yPosition += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const POPByText1 = `REMARKS:`;
      doc.text(POPByText1, 15, yPosition);
    }

    yPosition += 5;
    doc.setFontSize(12);
    doc.setTextColor(128, 0, 0);
    doc.setFont('helvetica', 'bold');
    const POPByText = `${formattedText}`;
    doc.text(POPByText, 15, yPosition);
    // formattedText

    doc.save(`${shopKeepeerData?.Firm_Name} (${shopKeepeerData?.City}).pdf`);

    // window.location.reload();
    navigate("/fourbox")

  };

  const updateQuantity = (screwName, index, value) => {
    setOrderList((prevOrderList) => {
      const updatedOrderList = { ...prevOrderList };
      updatedOrderList[screwName][index].Quantity = value;
      return updatedOrderList;
    });
  };

  const updateScheme = (screwName, index, value) => {
    setOrderList((prevOrderList) => {
      const updatedOrderList = { ...prevOrderList };
      updatedOrderList[screwName][index].Scheme = value;
      return updatedOrderList;
    });
  }


  let totalCount = 0;

  // Iterate through each screwName key and add the length of the array to totalCount
  Object.keys(orderList).forEach((screwName) => {
    totalCount += orderList[screwName].length;
    // inputRef.current.value="0"

  });

  const [selectedRadio, setSelectedRadio] = useState(""); // State to store the selected radio value

  // Function to handle radio button change
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value === selectedRadio ? null : value); // Toggle the selected radio value
  };


  const [searchInput, setSearchInput] = useState('');
  const [currentScrewName, setCurrentScrewName] = useState('');


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

  const [textareaValue, setTextareaValue] = useState('');
  const [formattedText, setFormattedText] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };


  const addPopFunction = () => {
    setFormattedText(textareaValue.toUpperCase());
    handlePOPClose()

  }

  return (
    <div>


      {
        showModal == true &&
        <Modal show={showModal} onHide={handleClose}
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
              <Row>
                <Col>
                  <Row>
                    <Col xs="12" md="2" lg="2">
                      <h5 className='firmname-tag-h6'>Firm Name: </h5>
                    </Col>
                    <Col xs="12" md="10" lg="6"><h5 className='firmname-tag-h6' style={{ color: "black", paddingRight: "10px" }}>{shopKeepeerData?.Firm_Name}</h5></Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="6" lg="6">
                      <h5 className='firmname-tag-h6'>City: <span style={{ color: "black" }}>{shopKeepeerData?.City}</span></h5>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                      <h5 className='firmname-tag-h6'>Mode: <span style={{ color: "black" }}>{checked ? "Phone" : "Visit"}</span></h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <div className="position-relative" style={{ height: "200px", "overflow-y": "scroll" }}>
                <div className='pdf-class'>
                  {Object.keys(orderList).map((screwName, index) => (
                    <div key={index}>
                      {orderList[screwName]?.length > 0 ? <div className='d-flex justify-content-between mb-2'>
                        <div>
                          <h4 style={{ fontWeight: "700", color: "maroon" }}>{screwName} </h4>
                        </div>

                      </div> : ""}

                      {orderList[screwName].map((item, i) => (
                        <h6 key={i} style={{ listStyle: "none" }}>
                          {item.Size}
                          <input
                            type="text"
                            value={item.Quantity}
                            style={{ width: '55px', border: "1px solid gray", height: "30px", marginLeft: "16px", fontWeight: "500" }}
                            onChange={(e) => updateQuantity(screwName, i, e.target.value)}
                          />{" "}

                          <img src="/cancel1.png" onClick={() => removeFromOrderListFunction(screwName, i)} style={{ width: "24px", marginLeft: "16px", marginBottom: "5px", cursor: "pointer" }} />
                          {/* <button onClick={() => removeFromOrderListFunction(screwName, i)} style={{marginLeft:"20px",backgroundColor:"red",color:"white",
                             borderRadius:"5px",border:"none",fontSize:"16px",height: "30px",width:"70px"}}>Remove</button> */}
                        </h6>
                      ))}

                    </div>
                  ))}

                </div>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <button onClick={showPOPModalFunction}
                  disabled={totalCount > 0 ? false : true}
                  style={{
                    backgroundColor: "blue", color: "white",
                    borderRadius: "5px", border: "none", fontSize: "16px", height: "36px", width: "80px", float: "right"
                  }}
                >Remark</button>
                <button onClick={() => generatePDF(orderList, orderno)}
                  disabled={totalCount > 0 ? false : true}
                  style={{
                    backgroundColor: "green", color: "white",
                    borderRadius: "5px", border: "none", fontSize: "16px", height: "36px", width: "120px", float: "right"
                  }}
                >Genrate Order</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      }



      {/* POP MODAL CODE START */}
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

      {/* POP MODAL CODE END */}

      {/* WITH TYPE MODE CODE START */}

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
                  placeholder='Enter your Shopkeeper Name'
                  className='w-100'
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: "normal",
                    marginBottom: "10px",
                    outline: "none",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                  }}
                />

                <input
                  type='text'
                  placeholder='Enter city'
                  className='w-100'
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    paddingLeft: "10px",
                    fontSize: "16px",
                    fontWeight: "normal",
                    marginBottom: "10px",
                    outline: "none",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                  }}
                />
              </div>

               <div className='d-flex justify-content-between '>
               <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
                 <h4 className='firmname-tag-h6'>Order Details</h4>
               </div>
               <div style={{ width: "36px", display:"flex", justifyContent:"center", alignItems:"center" }}>
                 <img src="/pdfview.png" className='img-fluid' />
               </div>
             </div>

              <div className="position-relative mt-1" style={{ height: "200px", "overflow-y": "scroll" }}>
                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <div class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        CSK PHILLIPS
                      </div>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        CSK PHILLIPS ANTIQUE
                      </div>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse " aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                        CSK PHILLIPS ROSEGOLD
                      </div>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse " aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                        CSK PHILLIPS GOLDEN

                      </div>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse " aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFive">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                        CSK PHILLIPS AUTO BLACK FINISH
                      </div>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse " aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingSix">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                        PAN PHILLIPS
                      </div>
                    </h2>
                    <div id="collapseSix" class="accordion-collapse collapse " aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingSeven">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                        CSK SLOTTED
                      </div>
                    </h2>
                    <div id="collapseSeven" class="accordion-collapse collapse " aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingEight">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="true" aria-controls="collapseEight">
                        PAN SLOTTED
                      </div>
                    </h2>
                    <div id="collapseEight" class="accordion-collapse collapse " aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your pan slotted"
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingNine">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="true" aria-controls="collapseNine">
                        CSK SLOTTED WOOD
                      </div>
                    </h2>
                    <div id="collapseNine" class="accordion-collapse collapse " aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTen">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="true" aria-controls="collapseTen">
                        CSK PHILLIPS WOOD
                      </div>
                    </h2>
                    <div id="collapseTen" class="accordion-collapse collapse " aria-labelledby="headingTen" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading11">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse11" aria-expanded="true" aria-controls="collapse11">
                        DRYWALL 410
                      </div>
                    </h2>
                    <div id="collapse11" class="accordion-collapse collapse " aria-labelledby="heading11" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading12">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse12" aria-expanded="true" aria-controls="collapse12">
                        DRYWALL 410 ANTIQUE
                      </div>
                    </h2>
                    <div id="collapse12" class="accordion-collapse collapse " aria-labelledby="heading12" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading13">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse13" aria-expanded="true" aria-controls="collapse13">
                        DRYWALL 410 GOLDEN
                      </div>
                    </h2>
                    <div id="collapse13" class="accordion-collapse collapse " aria-labelledby="heading13" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading14">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse14" aria-expanded="true" aria-controls="collapse14">
                        CSK PHILLIPS SDS 410
                      </div>
                    </h2>
                    <div id="collapse14" class="accordion-collapse collapse " aria-labelledby="heading14" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading15">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse15" aria-expanded="true" aria-controls="collapse15">
                        PAN PHILLIPS SDS 410
                      </div>
                    </h2>
                    <div id="collapse15" class="accordion-collapse collapse " aria-labelledby="heading15" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading16">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse16" aria-expanded="true" aria-controls="collapse16">
                        HEX SDS EPDM 410
                      </div>
                    </h2>
                    <div id="collapse16" class="accordion-collapse collapse " aria-labelledby="heading16" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>


                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading17">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse17" aria-expanded="true" aria-controls="collapse17">
                        HEX SDS METAL BONDED EPDM
                      </div>
                    </h2>
                    <div id="collapse17" class="accordion-collapse collapse " aria-labelledby="heading17" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading18">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse18" aria-expanded="true" aria-controls="collapse18">
                        FULLCUT 410
                      </div>
                    </h2>
                    <div id="collapse18" class="accordion-collapse collapse " aria-labelledby="heading18" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading19">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse19" aria-expanded="true" aria-controls="collapse19">
                        FULLCUT 410 ANTIQUE
                      </div>
                    </h2>
                    <div id="collapse19" class="accordion-collapse collapse " aria-labelledby="heading19" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading20">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse20" aria-expanded="true" aria-controls="collapse20">
                        FULLCUT 410 GOLDEN
                      </div>
                    </h2>
                    <div id="collapse20" class="accordion-collapse collapse " aria-labelledby="heading20" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading21">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse21" aria-expanded="true" aria-controls="collapse21">
                        COMBINATION WITH WASHER S S
                      </div>
                    </h2>
                    <div id="collapse21" class="accordion-collapse collapse " aria-labelledby="heading21" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading22">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse22" aria-expanded="true" aria-controls="collapse22">
                        CSK SLOTTED BSW THREAD
                      </div>
                    </h2>
                    <div id="collapse22" class="accordion-collapse collapse " aria-labelledby="heading22" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading23">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse23" aria-expanded="true" aria-controls="collapse23">
                        CSK SLOTTED MM THREAD
                      </div>
                    </h2>
                    <div id="collapse23" class="accordion-collapse collapse " aria-labelledby="heading23" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>


                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading24">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse24" aria-expanded="true" aria-controls="collapse24">
                        CSK PHILLIPS MM THREAD
                      </div>
                    </h2>
                    <div id="collapse24" class="accordion-collapse collapse " aria-labelledby="heading24" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading25">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse25" aria-expanded="true" aria-controls="collapse25">
                        BLACK GYPSUM
                      </div>
                    </h2>
                    <div id="collapse25" class="accordion-collapse collapse " aria-labelledby="heading25" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading26">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse26" aria-expanded="true" aria-controls="collapse26">
                        WHITE CHROME FINISH
                      </div>
                    </h2>
                    <div id="collapse26" class="accordion-collapse collapse " aria-labelledby="heading26" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading27">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse27" aria-expanded="true" aria-controls="collapse27">
                        ZINK CHIPBOARD
                      </div>
                    </h2>
                    <div id="collapse27" class="accordion-collapse collapse " aria-labelledby="heading27" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading28">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse28" aria-expanded="true" aria-controls="collapse28">
                        COMBINATION WITH WASHER M S
                      </div>
                    </h2>
                    <div id="collapse28" class="accordion-collapse collapse " aria-labelledby="heading28" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading29">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse29" aria-expanded="true" aria-controls="collapse29">
                        CARRIAGE BOLTS 12 MM
                      </div>
                    </h2>
                    <div id="collapse29" class="accordion-collapse collapse " aria-labelledby="heading29" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading30">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse30" aria-expanded="true" aria-controls="collapse30">
                        CARRIAGE BOLTS 14 MM
                      </div>
                    </h2>
                    <div id="collapse30" class="accordion-collapse collapse " aria-labelledby="heading30" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading31">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse31" aria-expanded="true" aria-controls="collapse31">
                        KITCHEN BASKET SCREW
                      </div>
                    </h2>
                    <div id="collapse31" class="accordion-collapse collapse " aria-labelledby="heading31" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading32">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse32" aria-expanded="true" aria-controls="collapse32">
                        NAILS HEADLESS
                      </div>
                    </h2>
                    <div id="collapse32" class="accordion-collapse collapse " aria-labelledby="heading32" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="accordion" id="accordionExample" style={{ marginBottom: "6px", width: "98%" }}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="heading33">
                      <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse33" aria-expanded="true" aria-controls="collapse33">
                        NAILS ROUND HEAD
                      </div>
                    </h2>
                    <div id="collapse33" class="accordion-collapse collapse " aria-labelledby="heading33" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <textarea
                          rows="5"
                          className='w-100 p-1'
                          style={{ border: "none" }}
                          placeholder="Enter your order here..."
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>



              </div>
            </div>
            <div className='d-flex justify-content-between mt-2'>
              <button
                // onClick={showPOPModalFunction}
                disabled={totalCount > 0 ? false : true}
                style={{
                  backgroundColor: "blue", color: "white",
                  borderRadius: "5px", border: "none", fontSize: "16px", height: "36px", width: "80px", float: "right"
                }}
              >Remark</button>
              <button
                // onClick={() => generatePDF(orderList, orderno)}
                disabled={totalCount > 0 ? false : true}
                style={{
                  backgroundColor: "green", color: "white",
                  borderRadius: "5px", border: "none", fontSize: "16px", height: "36px", width: "120px", float: "right"
                }}
              >Genrate Order</button>
            </div>
          </Modal.Body>
        </Modal>
      }
      {/* WITH TYPE MODE CODE END */}



      {console.log("linkDataProps.state", linkDataProps.state)}

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
          <Col xs={12} sm={12} lg={12} className="d-flex justify-content-start align-items-center m-0 p-0">
            <div className="d-flex justify-content-start align-items-center pt-2">
              <h6 className='screwName-class'>{
                priceListData?.priceListData?.data?.[0]?.Schrew_Name
              }</h6>
            </div>
          </Col>
        </Row>
        <Row className=' mb-1'>

          <Col xs={6} sm={6} lg={6} className="d-flex justify-content-end m-0 p-0">
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
          <Col xs={2} sm={2} lg={2} className="d-flex justify-content-center m-0 p-0">

          </Col>
          <Col xs={3} sm={3} lg={3} className="d-flex justify-content-center align-items-center m-0 p-0">

            <ButtonGroup>
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant={checked ? 'success' : 'secondary'}
                checked={checked}
                value="1"
                onChange={(e) => setChecked(e.currentTarget.checked)}
                className="toggle-switch d-flex justify-content-center align-items-center"

              >
                Phone
              </ToggleButton>
            </ButtonGroup>
            {/* </div> */}
          </Col>
          <Col xs={1} sm={1} lg={1} className="d-flex justify-content-end">
            {
              linkDataProps?.state == 1111 ? <>
                <div className='d-flex justify-content-end align-items-center' style={{ width: "40px" }} >

                  {totalCount > 0 ? <>
                    <img src="/notepad1.jpg" style={{ width: "22px", cursor: "pointer" }} onClick={showOrderModalWithType} /> </>
                    : ""
                  }
                </div>
              </> :
                <>
                  <div className='d-flex justify-content-end align-items-center' style={{ width: "40px" }} >

                    {totalCount > 0 ? <>
                      <img src="/takeorder1.webp" style={{ width: "22px", cursor: "pointer" }} onClick={showOrderModal} /> </>
                      : ""
                    }
                  </div>
                </>
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
                  <img src="/rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} onError={(e) => console.log('Error loading image:', e)} />{" "} 100</th>

                <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                  Qty
                </th>
                {/* <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                  Info
                </th> */}
                <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                  Add
                </th>
              </tr>

            </thead>
            {priceListData?.priceListData?.data?.filter(data => data?.Size?.toLowerCase().includes(getInput.toLowerCase())).map((data, index) => {
              let quantity = 0; // Default quantity
              let scheme = ''; // Default scheme
              const screwName = priceListData?.priceListData?.data?.[0]?.Schrew_Name;

              return (
                <tr style={{ backgroundColor: "" }} className="tabel-row" key={index}>

                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Size}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Packing}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Price}</td>

                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }} className='p-2'>

                    <input type='text'
                      placeholder='Qty'
                      id="qtyInput"
                      ref={inputRef.current[index]}
                      style={{ width: '60px', border: "1px solid black", height: "28px", fontWeight: "500" }}
                      defaultValue={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </td>

                  {/* <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }} className='p-2'>
                    <input type='text'
                      placeholder='Info'
                      ref={inputSchemeRef.current[index]}
                      style={{ width: '75px', border: "1px solid black", height: "28px", fontWeight: "500" }}
                      defaultValue={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                    />
                  </td> */}
                  <td style={{ border: "1px solid black", textAlign: "center" }}>
                    {/* Add button */}
                    <img src="/addicone.jpg" style={{ width: "36px", cursor: "pointer" }} onClick={() =>
                      addToOrderListFunction(data)
                      // Clear input fields after adding
                    } />
                    {/* Cancel button */}
                    {/* <img src="cancel1.png" style={{ width: "40px" }} 
                    onClick={() => removeFromOrderListFunction(screwName, index)}
                    /> */}
                  </td>
                </tr>
              )
            })
            }

          </Table>

        </div>

      </div>

    </div>
  )
}

export default Commoncomponent