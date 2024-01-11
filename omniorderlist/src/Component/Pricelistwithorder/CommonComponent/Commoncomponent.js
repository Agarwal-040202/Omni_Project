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

import {Select} from "antd"
const { Option } = Select;




const Commoncomponent = (props) => {

  const navigate = useNavigate();

 
  const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""
  const shopKeepeerData = JSON.parse(sessionStorage?.getItem("shopKeeperData")) || ""

  console.log("dsffsf",shopKeepeerData?.Firm_Name,shopKeepeerData?.City,UserRole?.User_Name)

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

  console.log("priceListDatafff",checked,priceListData?.priceListData?.data)

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
  

  console.log("linkDataPropsllll", linkDataProps.state)


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
    // inputRef.current.value="kkkk"
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
  let yPosition = 10;
  const pageWidth = doc.internal.pageSize.getWidth();

  

  // Title
  doc.setFontSize(20);
  doc.setTextColor(176, 48, 96);
  doc.setFont('helvetica', 'bold');
  doc.text('Omni Screw Order', pageWidth / 2, yPosition, { align: 'center' });
  doc.setTextColor(0);
  yPosition += 10;

  // Order details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  const orderByText = `Order Number: ${orderno}, Order By: ${UserRole?.User_Name}`;
  doc.text(orderByText, 15, yPosition);

  const orderByType = `Order Mode: ${checked ? 'Phone' : 'Visit'}, Date: ${formattedDate}`;
  yPosition += 7;
  doc.text(orderByType, 15, yPosition);
  // doc.setTextColor(115, 48, 96);
  // doc.setFont('helvetica', 'bold');
  const shopKeeperData = `Firm Name: ${shopKeepeerData?.Firm_Name}, City: ${shopKeepeerData?.City}`;
  yPosition += 7;
  doc.text(shopKeeperData, 15, yPosition);

  yPosition += 7;

  // Order list
  Object.keys(orderList).forEach((screwName, index) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(screwName, 15, yPosition);
    yPosition += 7;

    orderList[screwName].forEach((item, i) => {
      const itemText = `${item.Size} - ${item.Quantity.toUpperCase()} ${item.Scheme}`;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(itemText, 20, yPosition);
      yPosition += 7;
    });

    yPosition += 1;
  });

  doc.save(`${shopKeepeerData?.Firm_Name}.pdf`);

  // window.location.reload();
  navigate("/fourbox"
//   , {
//     // userRole:"",
//     // userCode: respos.data[0]?.User_Code,
//     state: ""
// })
  )

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


console.log("dsserertgvxsww",totalCount)

const [selectedRadio, setSelectedRadio] = useState(""); // State to store the selected radio value

  // Function to handle radio button change
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value === selectedRadio ? null : value); // Toggle the selected radio value
  };

  console.log("selectedRadio",selectedRadio)

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
                          <Col xs="12" md="10" lg="6"><h5 className='firmname-tag-h6' style={{color:"black",paddingRight:"10px"}}>{shopKeepeerData?.Firm_Name}</h5></Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="6">
                          <h5 className='firmname-tag-h6'>City: <span style={{color:"black"}}>{shopKeepeerData?.City}</span></h5>
                          </Col>
                          <Col xs="12" sm="6" lg="6">
                          <h5 className='firmname-tag-h6'>Mode: <span style={{color:"black"}}>{checked ? "Phone":"Visit"}</span></h5>
                          </Col>
                        </Row>
                      </Col>
                    </Row>  
                    <hr/>  
                             <div className="position-relative" style={{ height: "200px", "overflow-y": "scroll" }}>
                    <div className='pdf-class'>
                    {Object.keys(orderList).map((screwName, index) => (
     <div key={index}>
       {console.log("ordekkrListff",orderList[screwName]?.length)} 
       {orderList[screwName]?.length > 0 ?<>
        <h4 style={{ fontWeight:"700",color:"maroon"}}>{screwName}</h4>
       
       </> : ""}
       {/* <ul> */}
         {orderList[screwName].map((item, i) => (
           <h6 key={i} style={{ listStyle: "none" }}>
             {item.Size} 
             <input
               type="text"
               value={item.Quantity}
               style={{ width: '65px', border: "1px solid gray", height: "30px",marginLeft:"20px",fontWeight:"500" }}
               onChange={(e) => updateQuantity(screwName, i, e.target.value)}
             />{" "}
             Dis:{" "}
             <input
               type="text"
               value={item.Scheme}
               style={{ width: '75px', border: "1px solid gray", height: "30px",fontWeight:"500" }}
               onChange={(e) => updateScheme(screwName, i, e.target.value)}
             />
             <img src="cancel1.png" onClick={() => removeFromOrderListFunction(screwName, i)} style={{ width: "30px",marginLeft:"20px",marginBottom:"5px" ,cursor:"pointer"}}/>
             {/* <button onClick={() => removeFromOrderListFunction(screwName, i)} style={{marginLeft:"20px",backgroundColor:"red",color:"white",
            borderRadius:"5px",border:"none",fontSize:"16px",height: "30px",width:"70px"}}>Remove</button> */}
           </h6>
         ))}
       {/* </ul> */}
     </div>
   ))}

                     </div>
                     </div>
                     <hr/>
                     
                    <button onClick={() => generatePDF(orderList,orderno)}
                    disabled={totalCount>0?false:true}
                    style={{backgroundColor:"green",color:"white",
                    borderRadius:"5px",border:"none",fontSize:"16px",height: "36px",width:"120px",float:"right"}}
                    >Genrate Order</button>
                     </div>
                </Modal.Body>
            </Modal>
    
    }
      <div style={{backgroundColor:"white",height:"auto"}}>
        <img src={linkDataProps.state == 1 ? "./main-banner-2.jpg" : linkDataProps.state == 2 ? "./main-banner11.jpg" : linkDataProps.state == 3 ? "" :"" } className='img-fluid'/>
        {/* main-banner11 */}
      </div>
        <div className="Main-Layoyt-Div py-1 pb-2 px-3">
          
          {/* <div>
            {console.log("jjjjjkhkjjjj", data1[0]?.src, sorceVideo)}
            <video src="/videodata/FullCut410.mp4" muted autoPlay={"autoplay"} 
            poster="./Jacobandbella.jpg" preLoad="auto" loop className='w-100 video-class'>
              video tag is not supported by your browser</video>
          </div> */}


             <Row>
             <Col xs={12} sm={12} lg={12} className="d-flex justify-content-start align-items-center m-0 p-0">
              <div className="d-flex justify-content-start align-items-center pt-2">
                <h6 className='screwName-class'>{
                // data1[0]?.screwName
                priceListData?.priceListData?.data?.[0]?.Schrew_Name
                }</h6>
              </div>
            </Col>
             </Row>
          <Row className=' mb-1'>
           
            <Col xs={7} sm={7} lg={7} className="d-flex justify-content-end m-0 p-0">
              <div className='search_input-div w-100'>
                <div className='w-100'>
                  <Form.Control 
                  
                  size="sm" type="text" placeholder="Search Size" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
                </div>
                <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
                  <img src="searchicon2.png" className='w-75' />
                </div>
              </div>
            </Col>
            <Col xs={4} sm={4} lg={4} className="d-flex justify-content-center align-items-center m-0 p-0">
              <div>
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
              </div>
            </Col>
            <Col xs={1} sm={1} lg={1} className="d-flex justify-content-end">
            <div className='d-flex justify-content-end align-items-center' style={{ width: "40px"}} >
              {/* <button onClick={showOrderModal}>order</button> */}
                  {totalCount > 0 ? <>
                    <img src="takeorder1.webp" style={{ width: "22px", cursor: "pointer"}}  onClick={showOrderModal} /> </>
                  :""
                  }
                
                </div>
            </Col>
          </Row>
          <div className="m-0 p-0 table-main-div heughtset">
          {console.log("datatatat",priceListData?.priceListData?.data)}
            <Table bordered className='m-0 p-0' id="HtmlToPdf" responsive>

              <thead className='bg-light' style={{ position: "sticky", top: "-2px", background: "white", zIndex: "5", height: "40px", }}>
                <tr >
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>Size</th>
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>Packing</th>
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                    <img src="rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "} 100 NOS.</th>

                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Qty
                      </th>
                      <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      Info
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
                    
                      <input type='text' 
                      placeholder='Qty'
                      id="qtyInput"
                      ref={inputRef.current[index]}
                      style={{ width: '65px',border:"1px solid black",height:"28px",fontWeight:"500"}}
                      defaultValue={quantity} 
                      onChange={(e) => setQuantity(e.target.value)}
                      /> 
                      </td>

                      <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }} className='p-2'>
                      <input type='text' 
                      placeholder='Info' 
                      ref={inputSchemeRef.current[index]} 
                      style={{ width: '75px',border:"1px solid black",height:"28px",fontWeight:"500" }}
                      defaultValue={scheme} 
                      onChange={(e) => setScheme(e.target.value)}
                      /> 
                      </td>
                      <td style={{ border: "1px solid black", textAlign: "center" }}>
                    {/* Add button */}
                    <img src="addicone.jpg" style={{ width: "38px",cursor:"pointer" }} onClick={() => 
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