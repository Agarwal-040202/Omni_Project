import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from "react-router-dom"
import { Modal } from "react-bootstrap"
import '@react-pdf-viewer/core/lib/styles/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch, useSelector } from "react-redux"
import MyContext from "../../MyContext";
import { v4 as uuidv4 } from "uuid"
import { paymentSaveDetails } from "../../Redux/Slice/paymentDetailSlice/paymentDetailsSaveSlice"

const PayableModal = ({ showModalReport, setShowModalReport }) => {


    const { paymentSaveDetailStatus, paymentSaveDetailError } = useSelector((State) => State?.addNewPaymentData)

    const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || ""
    const shopKeepeerData = JSON.parse(sessionStorage?.getItem("shopKeeperData")) || ""
    const OrderTypemodeVariable = sessionStorage.getItem('OrderTypemode') || "";

    console.log("paymentSaveDetailStatus", paymentSaveDetailStatus,paymentSaveDetailError)


    let { handleShopToast, setShowLoder } = useContext(MyContext)
    const dispatch = useDispatch()

    const [showPdfModalState, setShowPdfModalState] = useState(false);
    const [stateName, setStateName] = useState('');
    const [shopkeeperName, setShopkeeperName] = useState('');
    const [city, setCity] = useState('');
    const [accordionInputs, setAccordionInputs] = useState({});
    const [textareaValue, setTextareaValue] = useState('');
    const [formattedText, setFormattedText] = useState('');
    const [getStatusState, setStatusState] = useState(false)

    const linkDataProps = useLocation();
    const inputRef = useRef([])
    const inputSchemeRef = useRef([]);
    const searchInputRef = useRef(null)
    const { priceListData } = useSelector((state) => state);
    const [sorceVideo, setSourceVideo1] = useState('');
    const [getInput, setInput] = useState('');
    const [tableData, setTableData1] = useState([]);
    const [menuState, setMenuState] = useState('');
    const [screwName, setScrewName] = useState('');
    const [userIDState, setUserIDState] = useState("")
    const [userCodeState, setUserCodeState] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [orderDetails, setOrderDetails] = useState({});
    const [selectedRadio, setSelectedRadio] = useState(""); // State to store the selected radio value
    const [searchInput, setSearchInput] = useState('');
    const [currentScrewName, setCurrentScrewName] = useState('');
    const [orderListID, setOrderListID] = useState("")


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

        const paymentDetailObject = {
            paymentdetailID: '',
            fieldMemberName: '',
            firmName: '',
            City: '',
            Date_PaymentDetail: '',
            paymentObject: '',
            fieldMemberID: ''
        }

        // functionS()

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

    useEffect(() => {
        if (getStatusState == true) {
            callFunction()
        }
    }, [paymentSaveDetailStatus, paymentSaveDetailError])


    //Genrate pdf Code Start

    function handleGeneratePDF() {

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [190, 110] // height, width in portrait mode
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

        // Header
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

        const definedIndices = Object.keys(accordionInputs).filter(index => accordionInputs[index] !== undefined);

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

        const firmName = shopkeeperName.trim().split(/\s+/).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        const formattedCity = city.trim().split(/\s+/).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        const paymentDetailObject = {
            paymentdetailID: orderListID,
            fieldMemberName: UserRole?.User_Name,
            firmName: firmName,
            City: formattedCity,
            Date_PaymentDetail: formattedDate,
            paymentObject: accordionInputs,
            fieldMemberID: UserRole?.User_Id
        };

        try {
            dispatch(paymentSaveDetails(paymentDetailObject));
            setStatusState(true);
            console.log("paymentDetailObject34er", paymentDetailObject);
        } catch (err) {
            handleShopToast(true, 'Error', 'Something went wrong.');
        }

        const baseFileName = `${firmName} (${formattedCity})`;
        const fileName = `${baseFileName}.pdf`;

        doc.save(fileName);
        // handelcloseModalWithType();
        window.location.reload();
    }

    console.log("sdfsfsf",getStatusState)

    const callFunction = () => {
        if (paymentSaveDetailStatus == "pending") {
            setShowLoder(true)
        }
        else if (paymentSaveDetailStatus == "Success") {

            handleShopToast(true, 'Success', 'Payment Detail Save.')
            // navigate("/fourbox")
        }
        else {
            handleShopToast(true, 'Error', 'Something wrong.')

        }
    }

    console.log("setAccordifsdfonInputs",getStatusState,paymentSaveDetailStatus, accordionInputs)
    const screws = {

        "screwName":
            [
                "Payable Amount",
            ]
    }

    const handelcloseModalWithType = () => {
        // setShowOrderModalWithTypeState(false)
        setShowModalReport(false)
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

    }


    const showPdfModalFunction = () => {
        setShowPdfModalState(true)

    }

    const handlePdfClose = () => {
        setShowPdfModalState(false)

    }


    const hasNonEmptyValue = Object.values(accordionInputs).some(value => value.trim() !== '');

    console.log("accordionInputs", accordionInputs)



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
                showModalReport == true &&
                <Modal show={showModalReport}
                    onHide={handelcloseModalWithType}
                    centered
                    backdrop={false}
                    size="lg"
                    style={{ zIndex: 9 }}
                >
                    <Modal.Header closeButton closeVariant={"white"} style={{ backgroundColor: "maroon" }}>
                        <Modal.Title style={{ color: "white" }}>Payable Amount</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>

                            {/* <input
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
                )} */}
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
                                                        style={{ border: "none" }}
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
                            >Genrate Report</button>
                        </div>
                    </Modal.Body>
                </Modal>
            }

            {/* MANUAL MODE MODAL CODE end */}

        </>
    );
};

export default PayableModal;
