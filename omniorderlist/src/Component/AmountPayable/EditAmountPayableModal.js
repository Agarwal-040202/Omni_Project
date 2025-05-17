import React, { useState, useEffect, useContext } from 'react';
import { Modal } from "react-bootstrap"
import '@react-pdf-viewer/core/lib/styles/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch, useSelector } from "react-redux"
import { updatePaymentData } from "../../Redux/Slice/paymentDetailSlice/paymentDetailsEditSlice"
import MyContext from "../../MyContext";
// import { compose } from '@reduxjs/toolkit';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { Col, Row } from 'react-bootstrap';

const EditAmountPayableModal = ({ showModalEdit, setShowModalEdit, editReportDetail }) => {

    const { updatePaymentDetailStatus, updatePaymentDetailError } = useSelector((State) => State.updatePaymentDetails)
    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const dispatch = useDispatch()

    console.log("ouoooiyoiyosa", updatePaymentDetailStatus, updatePaymentDetailError)


    console.log("kljkjhhghghghg", editReportDetail?.Date_PaymentDetail)
    // const { priceListData } = useSelector((state) => state);

    // const [checked, setChecked] = useState(editReportDetail?.reportMode == "Phone" ? true : false);
    const [showPopModalState, setShowPopModalState] = useState(false);
    const [showPdfModalState, setShowPdfModalState] = useState(false);
    const [stateName, setStateName] = useState('');
    const [shopkeeperName, setShopkeeperName] = useState('');
    const [city, setCity] = useState('');
    const [showOrderModalWithTypeState, setShowOrderModalWithTypeState] = useState(false)
    const [accordionInputs, setAccordionInputs] = useState({});
    const [textareaValue, setTextareaValue] = useState('');
    const [formattedText, setFormattedText] = useState('');
    const [getStatusState, setStatusState] = useState(false)


    //   console.log("hhlhlhlhlh", editReportDetail?.orderNo, editReportDetail?.orderMode)


    const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

    // Add this useEffect to set the active accordion index when data is shown
    useEffect(() => {
        const activeIndex = Object.keys(accordionInputs).findIndex((key) => accordionInputs[key].trim() !== '');
        setActiveAccordionIndex(activeIndex !== -1 ? activeIndex : null);
    }, [accordionInputs]);



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

        console.log("dddddddffddd", editReportDetail?.paymentObject)
        if (editReportDetail?.paymentObject) {
            try {
                const parsedObject = JSON.parse(editReportDetail.paymentObject);
                setAccordionInputs(parsedObject);
                // setStateName(editReportDetail?.stateName)
                setShopkeeperName(editReportDetail?.firmName)
                setCity(editReportDetail?.City)
                // setTextareaValue(editReportDetail?.remark)
            } catch (error) {
                console.error("Error parsing JSON object:", error);
            }
        }
    }, [editReportDetail]);


    console.log("setAccordionInputs", accordionInputs)



    const screws = {

        "screwName":
            [
                "Payable Amount",
            ]
    }



    const handelcloseModalWithType = () => {
        // setShowOrderModalWithTypeState(false)
        setShowModalEdit(false)
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
    }, [updatePaymentDetailStatus, updatePaymentDetailError])


    const handleGeneratePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [190, 110] // width, height in portrait mode
        });


        let yPosition = 10;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const marginX = 10;

        const drawBorder = () => {
            const margin = 2;
            doc.setLineWidth(0.5);
            doc.setDrawColor(0, 0, 0);
            doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
        };

        const addFooter = () => {
            const footerY = pageHeight - 10;
            doc.setFontSize(9);
            doc.setTextColor(150);
            doc.text("R P STEEL • Rohtak • HDFC Bank • IFSC: HDFC0000176", pageWidth / 2, footerY, { align: 'center' });
        };

        const addNewPage = () => {
            doc.addPage([190, 90]); // height, width for new page
            drawBorder();
            yPosition = 10;
            addFooter();
        };

        // header
        doc.setFillColor(230, 230, 250);
        doc.rect(2, 2, pageWidth - 4, 12, 'F');
        drawBorder();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(0, 51, 102);
        doc.text('Omni Account Details', pageWidth / 2, 10, { align: 'center' });

        yPosition = 20;

        doc.setFontSize(12);
        doc.setTextColor(64);
        doc.text(shopkeeperName.toUpperCase(), marginX, yPosition);
        yPosition += 7;
        doc.text(city.toUpperCase(), marginX, yPosition);
        yPosition += 10;

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Respected Sir,', marginX, yPosition);
        yPosition += 7;

        doc.setFontSize(10);
        doc.text('Kindly clear the due bills by RTGS/NEFT/IMPS ASAP...', marginX, yPosition);
        yPosition += 5;

        // Filter out the indices of screws with defined textarea values
        const definedIndices = Object.keys(accordionInputs).filter(index => accordionInputs[index] !== undefined);

        // Shopkeeper Details
        definedIndices.forEach((index, i) => {
            const screw = screws.screwName[index];
            const textareaValue = accordionInputs[index];
            const lines = doc.splitTextToSize(textareaValue, pageWidth - 2 * marginX);
            let remainingLines = lines;

            while (remainingLines.length > 0) {
                if (yPosition + 30 > pageHeight) {
                    addNewPage();
                }

                doc.setFillColor(240, 240, 240);
                doc.rect(marginX - 2, yPosition, pageWidth - 2 * marginX + 4, 7, 'F');
                doc.setFontSize(12);
                doc.setTextColor(204, 0, 0);
                doc.text(screw, marginX, yPosition + 5);
                yPosition += 12;

                const availableLines = Math.floor((pageHeight - yPosition) / 5);
                const linesToRender = remainingLines.slice(0, availableLines);

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(11);
                doc.setTextColor(0, 0, 0);
                linesToRender.forEach(line => {
                    doc.text(line, marginX + 5, yPosition);
                    yPosition += 5;
                });

                remainingLines = remainingLines.slice(availableLines);
                if (remainingLines.length > 0) {
                    addNewPage();
                }
            }

            yPosition += 4;
            if (i < definedIndices.length - 1 && yPosition + 30 > pageHeight) {
                addNewPage();
            }
        });


       

        // Remarks section
        yPosition += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(128, 0, 0);
        doc.text(`Regards:`, marginX, yPosition);
        yPosition += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const paymentDetails = [
            `R P STEEL, Rohtak`,
            `HDFC Bank`,
            `Modal Town Branch, Rohtak-124001`,
            `A/C No. 01768970000192`,
            `IFSC Code :- HDFC0000176`
        ];
        paymentDetails.forEach(line => {
            doc.text(line, marginX, yPosition);
            yPosition += 5;
        });

        addFooter();


        const trimmedFirmName = shopkeeperName.trim(); // Trim extra spaces
        const firmName = trimmedFirmName
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        const trimmedCity = city.trim(); // Trim extra spaces
        const formattedCity = trimmedCity
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');


        const paymentDetailObject = {
            paymentdetailID: editReportDetail?.paymentdetailID,
            fieldMemberName: editReportDetail?.fieldMemberName,
            firmName: firmName,
            City: formattedCity,
            Date_PaymentDetail: editReportDetail?.Date_PaymentDetail,
            paymentObject: accordionInputs,
            fieldMemberID: editReportDetail?.fieldMemberID
        }


        try {

            dispatch(updatePaymentData(paymentDetailObject));
            setStatusState(true);
        } catch (err) {
            handleShopToast(true, 'Error', 'Something went wrong.');
        }
        console.log("orderLikjhlhlhstObject", paymentDetailObject)

        // Save the PDF
        doc.save(`${shopkeeperName} (${city}).pdf`);
        // handelcloseModalWithType();
        window.location.reload()
    };


    const callFunction = () => {
        if (updatePaymentDetailStatus == "pending") {
            setShowLoder(true)
        }
        else if (updatePaymentDetailStatus == "Success") {

            handleShopToast(true, 'Success', 'Payment Detail update.')
            // navigate("/fourbox")
        }
        else {
            handleShopToast(true, 'Error', 'Something wrong.')

        }
    }

    return (
        <>

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
                        <Modal.Title style={{ color: "white" }}>Update Payable Amount</Modal.Title>
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
                                    <h4 className='firmname-tag-h6'>Amount Details</h4>
                                </div>

                                {/* <Col xs={3} sm={3} lg={3} className="d-flex justify-content-center align-items-center m-0 p-0">

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
                                </Col> */}
                                {/* editOrderDetail?.orderMode */}
                                {/* {console.log("toggle", checked)} */}

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
                                                        placeholder="Add payment detail here..."
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
                            {/* <button
                                onClick={showPOPModalFunction}
                                disabled={(hasNonEmptyValue && stateName !== "" && shopkeeperName !== "" && city !== "") ? false : true}
                                style={{
                                    backgroundColor: "blue", color: "white",
                                    borderRadius: "5px", border: "none", fontSize: "14px", height: "34px", width: "64px", float: "right"
                                }}
                            >Remark
                            </button> */}
                            <button
                                onClick={handleGeneratePDF}
                                disabled={(hasNonEmptyValue && shopkeeperName !== "" && city !== "") ? false : true}
                                style={{
                                    backgroundColor: "green", color: "white",
                                    borderRadius: "5px", border: "none", fontSize: "14px", height: "34px", width: "106px", float: "right"
                                }}
                            >Update Report</button>
                        </div>
                    </Modal.Body>
                </Modal>
            }

            {/* MANUAL MODE MODAL CODE end */}

        </>
    );
};

export default EditAmountPayableModal;
