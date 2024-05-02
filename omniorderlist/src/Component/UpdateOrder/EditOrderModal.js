import React, { useState, useEffect, useContext } from 'react';
import { Modal } from "react-bootstrap"
import '@react-pdf-viewer/core/lib/styles/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch, useSelector } from "react-redux"
import { updateOrderListData } from "../../Redux/Slice/orderListSlice/orderListEditSlice"
import MyContext from "../../MyContext";
import { compose } from '@reduxjs/toolkit';

const EditOrderModal = ({ showModalEdit, setShowModalEdit, editOrderDetail }) => {

  const { updateOrderDetailStatus, updateOrderDetailError } = useSelector((State) => State.updateOrderList)
  let { handleShopToast, setShowLoder } = useContext(MyContext)
  const dispatch = useDispatch()

  console.log("ouoooiyoiyosa", updateOrderDetailStatus, updateOrderDetailError)



  // const { priceListData } = useSelector((state) => state);
 
  const [checked, setChecked] = useState(false);
  const [showPopModalState, setShowPopModalState] = useState(false);
  const [showPdfModalState, setShowPdfModalState] = useState(false);
  const [shopkeeperName, setShopkeeperName] = useState('');
  const [city, setCity] = useState('');
  const [showOrderModalWithTypeState, setShowOrderModalWithTypeState] = useState(false)
  const [accordionInputs, setAccordionInputs] = useState({});
  const [textareaValue, setTextareaValue] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [getStatusState, setStatusState] = useState(false)


  console.log("hhlhlhlhlh", editOrderDetail?.orderNo)


  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

  // Add this useEffect to set the active accordion index when data is shown
  useEffect(() => {
    const activeIndex = Object.keys(accordionInputs).findIndex((key) => accordionInputs[key].trim() !== '');
    setActiveAccordionIndex(activeIndex !== -1 ? activeIndex : null);
  }, [accordionInputs]);





  // const handleAccordionTextareaChange = (index, value) => {

  //   if (value !== undefined) {
  //     console.log("rfdsfsxvxvcxvdfas", value)

  //     setAccordionInputs((prevState) => ({
  //       ...prevState,
  //       [index]: value,
  //     }));
  //   } else {
  //     setAccordionInputs((prevState) => {
  //       console.log("ooooooooo", value)

  //       const { [index]: omit, ...updatedState } = prevState;
  //       return updatedState;
  //     });
  //   }
  // };

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


  useEffect(() => {
    if (editOrderDetail?.orderObject) {
      try {
        const parsedObject = JSON.parse(editOrderDetail.orderObject);
        setAccordionInputs(parsedObject);
        setShopkeeperName(editOrderDetail?.firmName)
        setCity(editOrderDetail?.City)
        setTextareaValue(editOrderDetail?.remark)
      } catch (error) {
        console.error("Error parsing JSON object:", error);
      }
    }
  }, [editOrderDetail]);


  console.log("setAccordionInputs", accordionInputs)



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
        "HEX SDS 410",
        "HEX SDS METAL BONDED EPDM",
        "FULLCUT 410",
        "FULLCUT 410 ANTIQUE",
        "FULLCUT 410 GOLDEN",
        "COMBINATION WITH WASHER SS",
        "CSK SLOTTED BSW THREAD",
        "CSK SLOTTED MM THREAD",
        "CSK PHILLIPS MM THREAD",
        "BLACK GYPSUM",
        "WHITE CHROME FINISH",
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



  const handelcloseModalWithType = () => {
    // setShowOrderModalWithTypeState(false)
    setShowModalEdit(false)
  }

  const handleShopkeeperNameChange = (e) => {
    setShopkeeperName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const addPopFunction = () => {
    setFormattedText(textareaValue.toUpperCase());
    handlePOPClose()

  }

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


  const hasNonEmptyValue = Object.values(accordionInputs).some(value => value.trim() !== '');

  console.log("accordionInputs", accordionInputs)

  useEffect(() => {
    if (getStatusState == true) {
      callFunction()
    }
  }, [updateOrderDetailStatus, updateOrderDetailError])


  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    let yPosition = 10;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Function to add a new page
    const addNewPage = () => {
      doc.addPage(); // Add a new page
      yPosition = 10; // Reset yPosition for the new page
    };

    // Filter out the indices of screws with defined textarea values
    const definedIndices = Object.keys(accordionInputs).filter(index => accordionInputs[index] !== undefined);

    // Title
    doc.setFontSize(14);
    doc.setTextColor(128, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Omni Screw Orderlist', pageWidth / 2, yPosition, { align: 'center' });
    doc.setTextColor(0);
    yPosition += 10;

    // Shopkeeper Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const orderByText = `Order No: ${editOrderDetail?.orderNo}, Order By: ${editOrderDetail?.fieldMemberName}, Order Mode: ${checked ? 'Phone' : 'Visit'}, Date: ${editOrderDetail?.Date_OrderList}`;
    doc.text(orderByText, 15, yPosition);
    yPosition += 7;
    const shopKeeperData = `Firm Name: ${shopkeeperName.toUpperCase()}, City: ${city.toUpperCase()}, `;
    doc.text(shopKeeperData, 15, yPosition);
    yPosition += 10;

    

    // Iterate over the definedIndices array to generate PDF for defined textarea values
    definedIndices.forEach((index, i) => {
      const screw = screws.screwName[index];
      const textareaValue = accordionInputs[index];

      // Split textarea content into lines
      const lines = doc.splitTextToSize(textareaValue, pageWidth - 40);
      let remainingLines = lines;

      // If there are remaining lines to render
      while (remainingLines.length > 0) {
        // If space is not enough for the current content, add a new page
        if (yPosition + 30 > doc.internal.pageSize.getHeight()) {
          addNewPage();
        }

        // Screw Name
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${screw}`, 15, yPosition);
        yPosition += 6;

        // Calculate how many lines can fit on the current page
        const availableLines = Math.floor((doc.internal.pageSize.getHeight() - yPosition) / 5);
        const linesToRender = remainingLines.slice(0, availableLines);

        // Render lines on the current page
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(linesToRender, 20, yPosition);
        yPosition += linesToRender.length * 5; // Adjust yPosition based on the height of the rendered lines

        remainingLines = remainingLines.slice(availableLines); // Update remaining lines to render

        // If there are remaining lines, add a new page
        if (remainingLines.length > 0) {
          addNewPage();
        }
      }

      yPosition += 3; // Adjust the space between screw sections

      // If it's not the last item and the space is not enough for the next content, add a new page
      if (i < definedIndices.length - 1 && yPosition + 30 > doc.internal.pageSize.getHeight()) {
        addNewPage();
      }
    });

    // Remarks section
    if (formattedText) {
      // Add spacing before remarks section
      yPosition += 5;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      const remarksText = `REMARKS:`;
      doc.text(remarksText, 15, yPosition);
      yPosition += 5; // Add some space before printing the actual remarks
      doc.setFontSize(11);
      doc.setTextColor(128, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(formattedText, 15, yPosition);
    }

    // Check if there is remaining data to be rendered
    if (yPosition + 30 > doc.internal.pageSize.getHeight()) {
      addNewPage(); // Add a new page if there is remaining data
    }



    const orderListObject = {
      orderListID: editOrderDetail?.orderListID,
      orderNo: editOrderDetail?.orderNo,
      fieldMemberName: editOrderDetail?.fieldMemberName,
      orderMode: checked ? 'Phone' : 'Visit',
      firmName: shopkeeperName,
      City: city,
      Date_OrderList: editOrderDetail?.Date_OrderList,
      orderObject: accordionInputs,
      remark: formattedText ? formattedText : textareaValue,
      fieldMemberID: editOrderDetail?.fieldMemberID
    }

    try {

      dispatch(updateOrderListData(orderListObject));
      setStatusState(true);
    } catch (err) {
      handleShopToast(true, 'Error', 'Something went wrong.');
    }


    console.log("orderLikjhlhlhstObject", orderListObject)

    // Save the PDF
    doc.save(`${shopkeeperName} (${city}).pdf`);
    // handelcloseModalWithType();
    window.location.reload()
  };

  // updateOrderDetailStatus, updateOrderDetailError
  const callFunction = () => {
    if (updateOrderDetailStatus == "pending") {
      setShowLoder(true)
    }
    else if (updateOrderDetailStatus == "Success") {

      handleShopToast(true, 'Success', 'Order update sucessfully.')
      // navigate("/fourbox")
    }
    else {
      handleShopToast(true, 'Error', 'Something wrong.')

    }

  }


  return (
    <>

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
        showModalEdit == true &&
        <Modal show={showModalEdit}
          onHide={handelcloseModalWithType}
          centered
          backdrop={false}
          size="lg"
          style={{ zIndex: 9 }}
        >
          <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
            <Modal.Title style={{ color: "white" }}>Update Omni Order List</Modal.Title>
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
              >Update Order</button>
            </div>
          </Modal.Body>
        </Modal>
      }

      {/* MANUAL MODE MODAL CODE end */}

    </>
  );
};

export default EditOrderModal;
