import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { data1 } from "../AllTableData/Tabeldata"
import "../CommonComponent/commoncomponnet.css"
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
// import omnipdf from "../../../public/images/OmniBroucher2022.pdf"
import {Select} from "antd"
const { Option } = Select;

const Commoncomponent = (props) => {
  const linkDataProps = useLocation();

  const [sorceVideo, setSourceVideo] = useState('');
  const [sorceVideo1, setSourceVideo1] = useState('');
  const [getInput, setInput] = useState("")
  const [tabelData, setTableData] = useState([])
  const [tabelData1, setTableData1] = useState([])
  const [menuState,setMenuState] = useState()

  // setSourceVideo()
  useEffect(() => {
    setSourceVideo1(data1[0]?.src)
    setSourceVideo(data1[linkDataProps.state]?.src)
    setTableData(data1[linkDataProps.state]?.dataMain)
    setTableData1(data1[0]?.dataMain)

    setMenuState(linkDataProps.state)

  }, [data1[linkDataProps.state]?.src])

  console.log("tabelDatatabelData", data1,linkDataProps)

  const exportPDF = () => {
    // console.log("gjhgjhgjgj", data1[linkDataProps.state]?.dataMain?.map(data => ({
    //   ...data,datakey:data.size
    // })))

    console.log("kkkkkkkkkkkkk", data1[linkDataProps.state]?.dataMain?.map(({size,packing,price})=>{
      return [
        size,packing,price
      ]
    }))
   
    const doc = new jsPDF()
    doc.text(data1[linkDataProps.state]?.screwName, 14, 10)

    doc.autoTable({
      head: [['SIZE', 'PACKING', 'Rs. 100 NOS.']],
      body: 
        data1[linkDataProps.state]?.dataMain?.map(({size,packing,price})=>{
          return [
            size,packing,price
          ]
        })
    })
    doc.save(`${data1[linkDataProps.state]?.screwName}.pdf`)
  }


  console.log("linksdfdsf", menuState)

  const searchData = (e) => {
    setInput(e.target.value)

  }
  console.log("lkjljkljl", getInput)


  return (
    <div>
      {
        linkDataProps.state >0 || linkDataProps.state == 0?
          <div className="Main-Layoyt-Div py-1 px-2">
            <div >
              {/* {console.log("jjjjjjjjj", data1[linkDataProps.state]?.src, sorceVideo)} */}
              {/* <div className="video-container "> */}
              <video  autoPlay loop src={sorceVideo} className='w-100 video-class' >
                {/* <source src={sorceVideo} type="video/mp4" /> */}
              </video>


            </div>

            <Row className=' mb-1' >
              <Col xs={4} sm={4} lg={4} className="d-flex justify-content-start align-items-center" >
                <div className="d-flex justify-content-start align-items-center pt-2">
                  <h6 className='screwName-class'>{data1[linkDataProps.state]?.screwName}</h6>
                </div>
              </Col>
              <Col xs={7} sm={7} lg={7} className="d-flex justify-content-end">
                <div className='search_input-div w-100  '>
                  <div className='w-100'>
                    <Form.Control size="sm" type="text" placeholder="Search Size" className='search_input' value={getInput} onChange={(e) => searchData(e)} />
                  </div>
                  <div className='d-flex justify-content-end align-items-center' style={{ width: "30px" }}>
                    <img src="searchicon2.png" className='w-75' />
                  </div>
                </div>
              </Col>
              <Col xs={1} sm={1} lg={1} className="d-flex justify-content-end ">
        

              <div className='d-flex justify-content-end align-items-center' style={{ width: "40px" }}>
                <a href="#" download >
                  <img src="printer3.jpg"
                  //  onClick={exportPDF} 
                   style={{ width: "28px", cursor: "pointer" }} />
                  </a>
                </div>
              </Col>
            </Row>

            <div

              className="m-0 p-0 table-main-div heughtset"
            >

              <Table bordered className='m-0 p-0'
                id="HtmlToPdf"
                responsive
              >

                <thead className='bg-light' style={{ position: "sticky", top: "-2px", background: "white", zIndex: "5", height: "40px", }}>

                  <tr >
                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>SIZE</th>
                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>PACKING</th>
                    <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      <img src="rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "} 100 NOS.
                      </th>
                      <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      {/* <img src="rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "}  */}
                      Quantity
                      </th>
                      <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      {/* {/* <img src="rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "}  */}
                      Scheme
                      </th> 
                      <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                      {/* <img src="rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "}  */}
                      Action
                      </th>
                  </tr>

                </thead>
                {tabelData?.filter(data => data?.size?.toLowerCase().includes(getInput.toLowerCase())).map((data, index) => {
                  return (
                    <tr style={{ backgroundColor: "" }} className="tabel-row">
                      <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data.size}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data.packing}</td>

                      <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data.price}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>
                      <Select
        id="exampleSelect"
       
        style={{ width: '100px' }} // Adjust the width as needed
      >
        <Option value="option1">1</Option>
        <Option value="option2">2</Option>
        <Option value="option3">10 Case</Option>
      </Select>
                       
                      </td>

                      <td style={{ border: "1px solid black", textAlign: "center"}}>
                        <h6 style={{ fontWeight: "700", fontFamily: "sans-serif",fontSize:"12px" }} >Today Deal</h6>
                      </td>

                      <td style={{ border: "1px solid black",textAlign: "center" }}>
                        <img src="addicone.jpg" style={{width:"38px"}}/>
                        <img src="cancel1.png" style={{width:"40px"}}/>
 
                      </td>

                    </tr>
                  )
                })
                }

              </Table>


            </div>

          </div>
          :
          <div   className="Main-Layoyt-Div py-1 pb-2 px-3">
          <div >
            {console.log("jjjjjkhkjjjj", data1[0]?.src, sorceVideo)}
            <video src="/videodata/FullCut410.mp4" muted autoPlay={"autoplay"} 
            poster="./Jacobandbella.jpg" preLoad="auto" loop className='w-100 video-class'>
              video tag is not supported by your browser</video>
          </div>

          <Row className=' mb-1' >
            <Col xs={4} sm={4} lg={4} className="d-flex justify-content-start align-items-center">
              <div className="d-flex justify-content-start align-items-center pt-2">
                <h6 className='screwName-class'>{data1[0]?.screwName}</h6>
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
              
                  <a href="#" download >
                  <img src="images/printer3.jpg"
                  //  onClick={exportPDF} 
                   style={{ width: "28px", cursor: "pointer" }} />
                  </a>
                </div>
            </Col>
          </Row>

          <div className="m-0 p-0 table-main-div heughtset">

            <Table bordered className='m-0 p-0' id="HtmlToPdf">

              <thead className='bg-light' style={{ position: "sticky", top: "-2px", background: "white", zIndex: "5", height: "40px", }}>
                <tr >
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>SIZE</th>
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>PACKING</th>
                  <th className="text-center " style={{ border: "1px solid black", color: "maroon", borderTop: "none", fontFamily: "sans-serif" }}>
                    <img src="images/rsicon1.jpg" style={{ height: "12px", marginTop: "-3px" }} />{" "} 100 NOS.</th>
                </tr>

              </thead>
              {tabelData1?.filter(data => data?.size?.toLowerCase().includes(getInput.toLowerCase())).map((data, index) => {
                return (
                  <tr style={{ backgroundColor: "" }} className="tabel-row">
                    <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data.size}</td>
                    <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data.packing}</td>
                    <td style={{ border: "1px solid black", textAlign: "center", fontWeight: "600", fontFamily: "sans-serif", color: "#1C2833" }}>{data.price}</td>
                  </tr>
                )
              })
              }

            </Table>


          </div>

        </div>

      }
    </div>
  )
}

export default Commoncomponent