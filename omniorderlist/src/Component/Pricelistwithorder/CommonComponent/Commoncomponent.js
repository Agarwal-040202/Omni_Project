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
  // const [getInput1, setInput1] = useState("");
  const [userIDState, setUserIDState] = useState("")
  const [userCodeState, setUserCodeState] = useState("")
  const [checked, setChecked] = useState(false);
  const [showPopModalState, setShowPopModalState] = useState(false);
  const [showPdfModalState, setShowPdfModalState] = useState(false);

  const [showModal, setShowModal] = useState(false)
  const [shopkeeperName, setShopkeeperName] = useState('');
  const [city, setCity] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [showOrderModalWithTypeState, setShowOrderModalWithTypeState] = useState(false)
  const [accordionInputs, setAccordionInputs] = useState({});
  // const [pdfData, setPdfData] = useState(null); // State to store PDF data URI
  // const [loader, setLoader] = useState(false)
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
  // const addToOrderListFunction = (data) => {
  //   const screwName = priceListData?.priceListData?.data?.[0]?.Schrew_Name;

  //   // Check if the screwName already exists in orderList, if not, initialize it with an empty array
  //   if (!orderList[screwName]) {
  //     orderList[screwName] = [];
  //   }

  //   // Check if an item with the same Size already exists in the order list
  //   const existingItemIndex = orderList[screwName].findIndex((item) => item.Size === data.Size);

  //   if (existingItemIndex !== -1) {
  //     // Item with the same Size already exists, update it
  //     orderList[screwName][existingItemIndex] = {
  //       ...orderList[screwName][existingItemIndex],
  //       Quantity: quantity,
  //       Scheme: scheme,
  //     };

  //   } else {
  //     // Item with the same Size doesn't exist, add a new item
  //     orderList[screwName].push({
  //       screwName: screwName,
  //       Size: data.Size,
  //       Quantity: quantity,
  //       Scheme: scheme,
  //     });

  //   }

  //   // Update the order list state
  //   setOrderList({ ...orderList });

  //   // Clear the input fields after adding/updating the item
  //   inputRef.current.value = ""
  //   setQuantity("");
  //   setScheme('');

  //   setCurrentScrewName(screwName);
  // };


  // console.log("ppuretyuiouy", JSON.stringify(orderList, null, 2));

  // const removeFromOrderListFunction = (screwName, index) => {
  //   setOrderList((prevOrderList) => {
  //     const updatedList = {
  //       ...prevOrderList,
  //       [screwName]: prevOrderList[screwName].filter((item, i) => i !== index),
  //     };

  //     // If the updated array's length is 0, remove the screwName key
  //     if (updatedList[screwName].length === 0) {
  //       delete updatedList[screwName];
  //     }

  //     return updatedList;
  //   });
  // };



  const showOrderModal = () => {
    setShowModal(true)
  }

  // const handleClose = () => {
  //   setShowModal(false)

  // }

  // new modelwithtype code start

  const screws = {
    "screwName":
      [
        "CSK PHILLIPS",
        "CSK PHILLIPS ANTIQUE",
        "CSK PHILLIPS ROSEGOLD",
        "CSK PHILLIPS GOLDEN",
        "CSK PHILLIPS AUTO BLACK FINISH",
        "PAN PHILLIPS",
        "CSK SLOTTED",
        "PAN SLOTTED",
        "CSK SLOTTED WOOD",
        "CSK PHILLIPS WOOD",
        "DRYWALL 410",
        "DRYWALL 410 ANTIQUE",
        "DRYWALL 410 GOLDEN",
        "CSK PHILLIPS SDS 410",
        "PAN PHILLIPS SDS 410",
        "HEX SDS EPDM 410",
        "HEX SDS METAL BONDED EPDM",
        "FULLCUT 410",
        "FULLCUT 410 ANTIQUE",
        "FULLCUT 410 GOLDEN",
        "COMBINATION WITH WASHER SS",
        "CSK SLOTTED BSW THREAD",
        "CSK SLOTTED MM THREAD",
        "CSK PHILLIPS MM THREAD",
        "BLACK GYPSUM",
        "CHROME FINISH",
        "ZINC CHIPBOARD",
        "ZINC COMBI WITH WASHER MS",
        "CARRIAGE BOLTS 12 MM",
        "CARRIAGE BOLTS 12 MM ANTIQUE",
        "CARRIAGE BOLTS 12 MM GOLDEN",
        "CARRIAGE BOLTS 14 MM",
        "KITCHEN BASKET SCREW",
        "NAILS HEADLESS",
        "NAILS ROUND HEAD",
        "Washer"
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



  console.log("accordionInputs", accordionInputs)

  // import { jsPDF } from "jspdf";

  // const handleGeneratePDF = () => {
  //   const doc = new jsPDF();
  //   let yPosition = 10;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  
  //   const addNewPage = () => {
  //     doc.addPage();
  //     yPosition = 10;
  //   };
  
  //   const definedIndices = Object.keys(accordionInputs).filter(index => accordionInputs[index] !== undefined);
  
  //   doc.setFontSize(14);
  //   doc.setTextColor(128, 0, 0);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Omni Screw Orderlist', pageWidth / 2, yPosition, { align: 'center' });
  //   doc.setTextColor(0);
  //   yPosition += 10;
  
  //   doc.setFontSize(12);
  //   doc.setFont('helvetica', 'normal');
  //   const orderByText = `Order No: ${orderno}, Order By: ${UserRole?.User_Name}, Order Mode: ${checked ? 'Phone' : 'Visit'}, Date: ${formattedDate}`;
  //   doc.text(orderByText, 15, yPosition);
  //   yPosition += 7;
  //   const shopKeeperData = `Firm Name: ${shopkeeperName.toUpperCase()}, City: ${city.toUpperCase()}, `;
  //   doc.text(shopKeeperData, 15, yPosition);
  //   yPosition += 10;
  
  //   definedIndices.forEach((index, i) => {
  //     const screw = screws.screwName[index];
  //     const textareaValue = accordionInputs[index];
  //     const lines = doc.splitTextToSize(textareaValue, pageWidth - 40);
  //     let remainingLines = lines;
  
  //     while (remainingLines.length > 0) {
  //       if (yPosition + 30 > doc.internal.pageSize.getHeight()) {
  //         addNewPage();
  //       }
  
  //       doc.setFontSize(12);
  //       doc.setFont('helvetica', 'bold');
  //       doc.text(`${screw}`, 15, yPosition);
  //       yPosition += 6;
  
  //       const availableLines = Math.floor((doc.internal.pageSize.getHeight() - yPosition) / 5);
  //       const linesToRender = remainingLines.slice(0, availableLines);
  
  //       doc.setFontSize(12);
  //       doc.setFont('helvetica', 'normal');
  //       doc.text(linesToRender, 20, yPosition);
  //       yPosition += linesToRender.length * 5;
  
  //       remainingLines = remainingLines.slice(availableLines);
  
  //       if (remainingLines.length > 0) {
  //         addNewPage();
  //       }
  //     }
  
  //     yPosition += 3;
  
  //     if (i < definedIndices.length - 1 && yPosition + 30 > doc.internal.pageSize.getHeight()) {
  //       addNewPage();
  //     }
  //   });
  
  //   if (formattedText) {
  //     yPosition += 5;
  //     doc.setFontSize(13);
  //     doc.setFont('helvetica', 'bold');
  //     const remarksText = `REMARKS:`;
  //     doc.text(remarksText, 15, yPosition);
  //     yPosition += 5;
  //     doc.setFontSize(11);
  //     doc.setTextColor(128, 0, 0);
  //     doc.setFont('helvetica', 'bold');
  //     doc.text(formattedText, 15, yPosition);
  //   }
  
  //   if (yPosition + 30 > doc.internal.pageSize.getHeight()) {
  //     addNewPage();
  //   }
  
  //   const trimmedFirmName = shopkeeperName.trim();
  //   const firmName = trimmedFirmName
  //     .split(/\s+/)
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
  
  //   const trimmedCity = city.trim();
  //   const formattedCity = trimmedCity
  //     .split(/\s+/)
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
  
  //   const orderListObject = {
  //     orderListID: orderListID,
  //     orderNo: orderno,
  //     fieldMemberName: UserRole?.User_Name,
  //     orderMode: checked ? 'Phone' : 'Visit',
  //     firmName: firmName,
  //     City: formattedCity,
  //     Date_OrderList: formattedDate,
  //     orderObject: accordionInputs,
  //     remark: formattedText,
  //     fieldMemberID: UserRole?.User_Id
  //   };
  
  //   dispatch(orderListDetails(orderListObject));
  
  //   console.log("orderListObject", orderListObject);
  
  //   // Save the PDF with a unique name
  //   const baseFileName = `${shopkeeperName} (${city})`;
  //   let fileName = `${baseFileName}.pdf`;
  //   let counter = 1;
  
  //   // Function to check if a file exists
  //   const fileExists = (name) => {
  //     try {
  //       // Attempt to open the file
  //       new jsPDF().save(name, { returnPromise: false });
  //       return false;
  //     } catch (e) {
  //       return true;
  //     }
  //   };
  
  //   // Find a unique file name
  //   while (fileExists(fileName)) {
  //     fileName = `${baseFileName} (${counter}).pdf`;
  //     counter += 1;
  //   }
  
  //   // Save the PDF
  //   doc.save(fileName);
  //   handelcloseModalWithType();
  // };

  // new code 4/8/24

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    const addNewPage = () => {
      doc.addPage();
      drawBorder();
      yPosition = 10;
    };

    const drawBorder = () => {
      const margin = 2; // Define the margin for the border
      doc.setLineWidth(1);
      doc.setDrawColor(0, 0, 0); // Black color for the border
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin); // Draw the border
    };
  
    // Draw the border on the first page
    drawBorder();
  
    const definedIndices = Object.keys(accordionInputs).filter(index => accordionInputs[index] !== undefined);
  
    // Title
    doc.setTextColor(128, 0, 0);
    doc.setFont('helvetica', 'bold');
    // doc.setFont("times", "bolditalic");
    doc.setFontSize(16);
    // doc.setTextColor(0, 102, 204);
    doc.text('Omni Screw Orderlist', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 14;
  
    // Shopkeeper Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
  
    // Order No and Date on the same line (left and right)
    doc.setFont("helvetica", "bold");
    const orderNoText = `Order No: ${orderno}`;
    doc.text(orderNoText, 15, yPosition);
    doc.setFont("helvetica", "bold");
    const dateText = `Date: ${formattedDate}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - dateTextWidth - 15, yPosition);
    yPosition += 7;
  
    // Order By and Order Mode on the same line (left and right)
    doc.setFont("helvetica", "bold");
    const orderByText = `Order By: ${UserRole?.User_Name}`;
    doc.text(orderByText, 15, yPosition);
    doc.setFont("helvetica", "bold");
    const orderModeText = `Order Mode: ${checked ? 'Phone' : 'Visit'}`;
    const orderModeTextWidth = doc.getTextWidth(orderModeText);
    doc.text(orderModeText, pageWidth - orderModeTextWidth - 15, yPosition);
    yPosition += 7;
  
    // Shopkeeper Details
    doc.setFont("helvetica", "bold");
    const shopKeeperData = `Firm Name: ${shopkeeperName.toUpperCase()}`;
    doc.text(shopKeeperData, 15, yPosition);
    yPosition += 7;

    doc.setFont("helvetica", "bold");
    const cityData = `City: ${city.toUpperCase()}`;
    doc.text(cityData, 15, yPosition);
    yPosition += 10;
  
    // Iterate over definedIndices to add screw data
    definedIndices.forEach((index, i) => {
      const screw = screws.screwName[index];
      const textareaValue = accordionInputs[index];
      const lines = doc.splitTextToSize(textareaValue, pageWidth - 40);
      let remainingLines = lines;
  
      while (remainingLines.length > 0) {
        if (yPosition + 30 > pageHeight) {
          addNewPage();
        }
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(204, 0, 0);
        doc.text(`${screw}`, 15, yPosition);
        yPosition += 6;
  
        const availableLines = Math.floor((pageHeight - yPosition) / 5);
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
  
      if (i < definedIndices.length - 1 && yPosition + 30 > pageHeight) {
        addNewPage();
      }
    });
  
    // Remarks section
    if (formattedText) {
      yPosition += 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(128, 0, 0);
      doc.text(`REMARKS:`, 15, yPosition);
      yPosition += 5;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text(formattedText, 15, yPosition);
    }
  
    if (yPosition + 30 > pageHeight) {
      addNewPage();
    }
  
    const trimmedFirmName = shopkeeperName.trim();
    const firmName = trimmedFirmName
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    const trimmedCity = city.trim();
    const formattedCity = trimmedCity
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    const orderListObject = {
      orderListID: orderListID,
      orderNo: orderno,
      fieldMemberName: UserRole?.User_Name,
      orderMode: checked ? 'Phone' : 'Visit',
      firmName: firmName,
      City: formattedCity,
      Date_OrderList: formattedDate,
      orderObject: accordionInputs,
      remark: formattedText,
      fieldMemberID: UserRole?.User_Id
    };
  
    dispatch(orderListDetails(orderListObject));
  
    console.log("orderListObject", orderListObject);
  
    const baseFileName = `${shopkeeperName} (${city})`;
    let fileName = `${baseFileName}.pdf`;
    // let counter = 1;
  
    // const fileExists = (name) => {
    //   try {
    //     new jsPDF().save(name, { returnPromise: false });
    //     return false;
    //   } catch (e) {
    //     return true;
    //   }
    // };
  
    // while (fileExists(fileName)) {
    //   fileName = `${baseFileName} (${counter}).pdf`;
    //   counter += 1;
    // }
  
    doc.save(fileName);
    handelcloseModalWithType();
    window.location.reload();
  };
  
  // cew code end 4/8/24
  
  


  // new modelwithtype code end

  // useEffect(() => {
  //   const savedAccordionInputs = sessionStorage.getItem('accordionInputs');

  //   if (savedAccordionInputs) {
  //     setAccordionInputs(JSON.parse(savedAccordionInputs));
  //   }
  //   console.log("asdasdadad", savedAccordionInputs)

  // }, []);


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

  // new code pdf start

  // const generatePDF = (orderList, orderno) => {
  //   const doc = new jsPDF();
  //   let yPosition = 10;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const itemsPerPage = 40; // Adjust this based on your layout and font size

  //   // Title
  //   doc.setFontSize(16);
  //   doc.setTextColor(128, 0, 0);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Omni Screw Order', pageWidth / 2, yPosition, { align: 'center' });
  //   doc.setTextColor(0);
  //   yPosition += 10;

  //   // Order details
  //   doc.setFontSize(14);
  //   doc.setFont('helvetica', 'normal');
  //   const orderByText = `Order No: ${orderno}, Order By: ${UserRole?.User_Name}, Order Mode: ${checked ? 'Phone' : 'Visit'}`;
  //   doc.text(orderByText, 15, yPosition);

  //   const shopKeeperData = `Firm Name: ${shopKeepeerData?.Firm_Name}, City: ${shopKeepeerData?.City}, Date: ${formattedDate}`;
  //   yPosition += 7;
  //   doc.text(shopKeeperData, 15, yPosition);
  //   yPosition += 10;

  //   // Iterate over order list
  //   Object.keys(orderList).forEach((screwName, index) => {
  //     const screwItems = orderList[screwName];

  //     // Display screw name
  //     doc.setFontSize(12);
  //     doc.setFont('helvetica', 'bold');
  //     doc.text(`${screwName}`, 15, yPosition);
  //     yPosition += 7;

  //     // Display items for the screw
  //     screwItems.forEach((item) => {
  //       if (yPosition > doc.internal.pageSize.getHeight() - 20) {
  //         // Move to the next page if remaining space is not enough
  //         doc.addPage();
  //         yPosition = 10; // Reset yPosition for the new page
  //       }

  //       const itemText = `${item.Size} - ${item.Quantity.toUpperCase()} ${item.Scheme}`;
  //       doc.setFontSize(12);
  //       doc.setFont('helvetica', 'normal');
  //       doc.text(itemText, 20, yPosition);
  //       yPosition += 6;
  //     });

  //     // Add spacing between screw names
  //     yPosition += 5;
  //   });

  //   // Remarks section
  //   if (formattedText != "") {
  //     // Add spacing before remarks section
  //     yPosition += 6;
  //     doc.setFontSize(14);
  //     doc.setFont('helvetica', 'bold');
  //     const remarksText = `REMARKS:`;
  //     doc.text(remarksText, 15, yPosition);
  //     yPosition += 5; // Add some space before printing the actual remarks
  //     doc.setFontSize(12);
  //     doc.setTextColor(128, 0, 0);
  //     doc.setFont('helvetica', 'bold');
  //     doc.text(formattedText, 15, yPosition);
  //   }

  //   // Save the PDF
  //   doc.save(`${shopKeepeerData?.Firm_Name} (${shopKeepeerData?.City}).pdf`);

  //   // Navigate to another page
  //   navigate("/fourbox");
  // };

  // new code pdf end

  // const updateQuantity = (screwName, index, value) => {
  //   setOrderList((prevOrderList) => {
  //     const updatedOrderList = { ...prevOrderList };
  //     updatedOrderList[screwName][index].Quantity = value;
  //     return updatedOrderList;
  //   });
  // };

  // const updateScheme = (screwName, index, value) => {
  //   setOrderList((prevOrderList) => {
  //     const updatedOrderList = { ...prevOrderList };
  //     updatedOrderList[screwName][index].Scheme = value;
  //     return updatedOrderList;
  //   });
  // }


  let totalCount = 0;

  // Iterate through each screwName key and add the length of the array to totalCount
  Object.keys(orderList).forEach((screwName) => {
    totalCount += orderList[screwName].length;
    // inputRef.current.value="0"

  });


  // Function to handle radio button change
  // const handleRadioChange = (e) => {
  //   const value = e.target.value;
  //   setSelectedRadio(value === selectedRadio ? null : value); // Toggle the selected radio value
  // };

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

      {/* {
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
                           <button onClick={() => removeFromOrderListFunction(screwName, i)} style={{marginLeft:"20px",backgroundColor:"red",color:"white",
                             borderRadius:"5px",border:"none",fontSize:"16px",height: "30px",width:"70px"}}>Remove</button> 
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
                >Genrate Orderkk</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      } */}

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
              {/* <h4 className='firmname-tag-h6'>View Order</h4> */}
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

                {(hasNonEmptyValue && shopkeeperName !== "" && city !== "") && (
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
                disabled={(hasNonEmptyValue && shopkeeperName !== "" && city !== "") ? false : true}
                style={{
                  backgroundColor: "blue", color: "white",
                  borderRadius: "5px", border: "none", fontSize: "14px", height: "34px", width: "64px", float: "right"
                }}
              >Remark
              </button>
              <button
                onClick={handleGeneratePDF}
                disabled={(hasNonEmptyValue && shopkeeperName !== "" && city !== "") ? false : true}
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
          {/* <Col xs={2} sm={2} lg={2} className="d-flex justify-content-center m-0 p-0">

          </Col> */}
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
            {/* </div> */}
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
                {/* {
                  OrderTypemodeVariable == "OrderTypemode" ? "" : <>
                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Qty
                    </th>
                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                  Info
                </th>
                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Add
                    </th>
                  </>
                } */}

              </tr>

            </thead>
            {priceListData?.priceListData?.data?.filter(data => data?.Size?.toLowerCase().includes(getInput.toLowerCase())).map((data, index) => {
              // let quantity = 0; // Default quantity
              // let scheme = ''; // Default scheme
              // const screwName = priceListData?.priceListData?.data?.[0]?.Schrew_Name;

              return (
                <tr style={{ backgroundColor: "" }} className="tabel-row" key={index}>

                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Size}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Packing}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data?.Price}</td>
                  {/* {
                    OrderTypemodeVariable == "OrderTypemode" ? "" : <>
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
                      <td style={{ border: "1px solid black", textAlign: "center" }}>
                        <img src="/addicone.jpg" style={{ width: "36px", cursor: "pointer" }} 
                        onClick={() =>
                          addToOrderListFunction(data)
                        } />

                      </td>
                    </>} */}

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