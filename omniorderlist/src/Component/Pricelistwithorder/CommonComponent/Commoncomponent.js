import React, { useEffect, useRef, useState } from 'react';
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
import {Select} from "antd"
const { Option } = Select;




const Commoncomponent = (props) => {
 
  const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""
  const shopKeepeerData = JSON.parse(sessionStorage?.getItem("shopKeeperData")) || ""

  console.log("dsffsf",shopKeepeerData?.Firm_Name,shopKeepeerData?.City,UserRole?.User_Name)

  const linkDataProps = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef(null)
  const inputSchemeRef = useRef(null);
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


  console.log("priceListDatafff",priceListData?.priceListData?.data)

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

console.log("userIDState",userCodeState)

// Create a new Date object to represent the current date
const currentDate = new Date();

// Get the day, month, and year components
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const year = currentDate.getFullYear();

// Create a formatted date string
const formattedDate = `${day}/${month}/${year}`;

const seconds = currentDate.getSeconds(); // Get the seconds component
const orderno= seconds + userCodeState

console.log("seconds",currentDate); // Output: The current seconds value (e.g., 0, 1, 2, ... 59)


const functionS = () => {
    try {
        dispatch(getPriceListData(linkDataProps?.state));

    }
    catch (err) {
        console.log(err)
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

  console.log("linkDataProps", linkDataProps)


  console.log("linksdfdsf", menuState)

  const searchData = (e) => {
    setInput(e.target.value)

  }
  console.log("lkjljkljl", getInput)

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
        screwName:screwName,
        Size: data.Size,
        Quantity: quantity,
        Scheme: scheme,
      });
    
    }
  
    // Update the order list state
    setOrderList({ ...orderList });

    // Clear the input fields after adding/updating the item
    inputRef.current.value="kkkk"
    // setQuantity("kkkk");
    // setScheme('');


  };

 console.log("sdfsdfs",orderList)
  

  // Step 9: Handle removing an item from the order list
  const removeFromOrderListFunction = (screwName, index) => {
    if (orderList[screwName]) {
      setOrderList((prevOrderList) => ({
        ...prevOrderList,
        [screwName]: prevOrderList[screwName].filter((item, i) => i !== index),
      }));
    }
  };

 

  console.log("orderList",orderList)

  const [showModal,setShowModal] = useState(false)


  const showOrderModal = ()=>{
     setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)

}

const [loader , setLoader] = useState(false)

const generatePDF = (orderList, orderno) => {
  const doc = new jsPDF();
  let yPosition = 10; // Adjust the Y position where the content starts
  const pageWidth = doc.internal.pageSize.getWidth();

  // Add the title with a custom text color
  doc.setFontSize(16);
  doc.setTextColor(176, 48, 96); // Maroon color (RGB values)
  doc.setFont('helvetica', 'bold')
  doc.text('Omni Screw Order', pageWidth / 2, yPosition, 'center');
  
  // Reset text color to the default
  doc.setTextColor(0); // Set the text color back to black

  yPosition += 10;
  doc.setFontSize(14);
  const orderByText = `Order Number: ${orderno}, Order By: ${UserRole?.User_Name}`;
  doc.setFont('helvetica', 'normal'); // Set the font to normal
  doc.text(orderByText, 10, yPosition);


  doc.setTextColor(0); // Set the text color back to black
  // shopKeepeerData?.Firm_Name,shopKeepeerData?.City,
  yPosition += 10;
  doc.setFontSize(14);
  const orderByType = `Order Type: ${"Visit"}  Date: ${formattedDate}`;
  doc.setFont('helvetica', 'normal'); // Set the font to normal
  doc.text(orderByType, 10, yPosition);

  doc.setTextColor(0); // Set the text color back to black
  yPosition += 10;
  doc.setFontSize(14);
  const shopKeeperData = `Firm Name: ${shopKeepeerData?.Firm_Name}, City: ${shopKeepeerData?.City}`;
  doc.setFont('helvetica', 'normal'); // Set the font to normal
  doc.text(shopKeeperData, 10, yPosition);

  yPosition += 10; // Move down after the title

  Object.keys(orderList).forEach((screwName, index) => {
    // Add screwName as a heading

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold'); // Set the font to bold
    doc.text(screwName, 10, yPosition);
    yPosition += 10; // Move down after the heading

    orderList[screwName].forEach((item, i) => {
      // Add item details

      const itemText = ` ${item.Size}  -  ${item.Quantity}   ${item.Scheme}`;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal'); // Set the font to normal
      doc.text(itemText, 10, yPosition);
      yPosition += 10; // Move down after each item
    });
  });

  // Save or download the PDF
  doc.save('order_list.pdf');
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
};

console.log("newoderlist",orderList)

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
                    <Modal.Title style={{ color: "white" }}>Order List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>                    
                    <div className='pdf-class'>
                    {Object.keys(orderList).map((screwName, index) => (
     <div key={index}>
       <h5>{screwName}</h5>
       <ul>
         {orderList[screwName].map((item, i) => (
           <li key={i} style={{ listStyle: "none" }}>
             {item.Size} Qty:{" "}
             <input
               type="text"
               value={item.Quantity}
               style={{ width: '65px', border: "1px solid black", height: "30px" }}
               onChange={(e) => updateQuantity(screwName, i, e.target.value)}
             />{" "}
             Scheme:{" "}
             <input
               type="text"
               value={item.Scheme}
               style={{ width: '75px', border: "1px solid black", height: "30px" }}
               onChange={(e) => updateScheme(screwName, i, e.target.value)}
             />
             <button onClick={() => removeFromOrderListFunction(screwName, i)}>Remove</button>
           </li>
         ))}
       </ul>
     </div>
   ))}

                     </div>
                    <button onClick={() => generatePDF(orderList,orderno)}>Download</button>
                     </div>
                </Modal.Body>
            </Modal>
    
    }
      
        <div className="Main-Layoyt-Div py-1 pb-2 px-3">
          <div>
            {console.log("jjjjjkhkjjjj", data1[0]?.src, sorceVideo)}
            <video src="/videodata/FullCut410.mp4" muted autoPlay={"autoplay"} 
            poster="./Jacobandbella.jpg" preLoad="auto" loop className='w-100 video-class'>
              video tag is not supported by your browser</video>
          </div>

          <Row className=' mb-1' >
            <Col xs={4} sm={4} lg={4} className="d-flex justify-content-start align-items-center">
              <div className="d-flex justify-content-start align-items-center pt-2">
                <h6 className='screwName-class'>{
                // data1[0]?.screwName
                priceListData?.priceListData?.data?.[0]?.Schrew_Name
                }</h6>
              </div>
            </Col>
            <Col xs={7} sm={7} lg={7} className="d-flex justify-content-end">
              <div className='search_input-div w-100'>
                <div className='w-100'>
                  <Form.Control size="sm" type="text" placeholder="Search Size" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
                </div>
                <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
                  <img src="images/searchicon2.png" className='w-75' />
                </div>
              </div>
            </Col>
            <Col xs={1} sm={1} lg={1} className="d-flex justify-content-end ">
            <div className='d-flex justify-content-end align-items-center' style={{ width: "40px" }}>
              <button onClick={showOrderModal}>order</button>
              
                  {/* <a href="#" download >
                  <img src="images/printer3.jpg"
                   style={{ width: "28px", cursor: "pointer" }} />
                  </a> */}
                </div>
            </Col>
          </Row>

          <div className="m-0 p-0 table-main-div heughtset">
          {console.log("datatatat",priceListData?.priceListData?.data?.[0].Price
)}
            <Table bordered className='m-0 p-0' id="HtmlToPdf">

              <thead className='bg-light' style={{ position: "sticky", top: "-2px", background: "white", zIndex: "5", height: "40px", }}>
                <tr >
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>Size</th>
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>Packing</th>
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                    <img src="images/rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "} 100 NOS.</th>

                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Qty
                      </th>
                      <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Scheme
                      </th> 
                      <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Action
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
                    
                      <input type='text' placeholder='Qty'
                      id="qtyInput"
                      ref={inputRef} 
                      style={{ width: '65px',border:"1px solid black",height:"30px"}}
                      defaultValue={quantity} 
                      onChange={(e) => setQuantity(e.target.value)}
                      /> 
                      </td>

                      <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }} className='p-2'>
                      <input type='text' placeholder='Scheme' 
                        ref={inputSchemeRef} 
                      style={{ width: '75px',border:"1px solid black",height:"30px" }}
                      defaultValue={scheme} 
                      onChange={(e) => setScheme(e.target.value)}
                      /> 
                      </td>
                      <td style={{ border: "1px solid black", textAlign: "center" }}>
                    {/* Add button */}
                    <img src="addicone.jpg" style={{ width: "38px" }} onClick={() => 
          addToOrderListFunction(data)
          // Clear input fields after adding
        } />
                    {/* Cancel button */}
                    <img src="cancel1.png" style={{ width: "40px" }} 
                    onClick={() => removeFromOrderListFunction(screwName, index)}
                    />
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