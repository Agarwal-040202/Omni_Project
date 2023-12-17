import React from 'react'
import "./certificate.css"
import {Row,Col} from "antd"
const Certificate = () => {
  return (
    <>
    <div className='d-flex justify-content-center'>
        <h2 className='headind-class-h2'>Certificate</h2>
       {/* new code push */}
        </div>
        <Row>
            <Col xs={24} lg={16} className='col-text-1'>
            <div className='certificate-text-div'>
               <p className='text-p-tag'>We believe in QC at every stage of business cycle : Marketing – Designing – Planning – Purchasing – Receiving – Inspection – Manufacturing – Process – Control – Finishing – Inspection – Packing transportation & Delivery. 
                Our trained and skilled manpower is our main strength. 
                we have workers who have more than a decade of experience on the various Machines.</p>

                <p className='text-p-tag'>
                We are an <b>ISO 9001:2000</b> certified company, hence we ensure that we adhere to all the guidelines and procedures laid down for proper and systematic working of the organisation. 
                As the largest supplier of stainless steel screws in India our quality & service are certain to please and satisfied our customers. 
                Consult a professional & discover the difference between Omni Stainless Steel Screws & other similar stainless steel screws in the market.
                </p>
                <div className='mt-4'>
                <h4 className='heading-tag-h4'>Why Stainless Steel Screw?</h4>
                
                    <li className='li-tag-text'>Easy to clean, hygienic</li>
                    <li className='li-tag-text'>Safe</li>
                    <li className='li-tag-text'>No red rust</li>
                    <li className='li-tag-text'>Moisture Proof</li>
                    <li className='li-tag-text'>Utilization for foodstuffs</li>
                    <li className='li-tag-text'>No risk from sucking</li>
                    <li className='li-tag-text'>Bright surface, good appearance</li>
                    <li className='li-tag-text'>Stainless steel has low magnetism</li>
                    <li className='li-tag-text'>High resistance to elevated temperatures</li>
                
            </div>
            </div>
            
            </Col>
            <Col xs={24} lg={8} className='col-imge-2'>
            <div className='certificate-text-div d-flex justify-content-center'>
               <img src="./certicate.jpg" className='img-fluid'/>
            </div>
            </Col>
        </Row>
    </>
  )
}

export default Certificate