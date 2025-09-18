import React from 'react'
import {Row,Col} from "antd"


const AboutUS = () => {
  return (
    <>
    <div>
    <div className='d-flex justify-content-center'>
        <h2 className='headind-class-h2 fancy-heading'>About US</h2>
        </div>
        <Row>
            <Col xs={24} lg={16} className='col-text-1'>
            <div className='certificate-text-div'>
               <p className='text-p-tag'>
                R P STEEL Established in 1992, Brand Omni has emerged as a pioneer of Stainless Steel Screws in India. 
               R P STEEL through their brand Omni enjoys a major market share in the Stainless Steel Screws segment and also has received appreciation from leading architects builders & manufacture industry for its high quality and durability of the product.</p>

                <p className='text-p-tag'>
                Stainless Steel Screws lasts many times longer and remain rust & moisture-proof as compared to other screws available in the market. 
                Omni has complete in-house production facilities having all the latest & Hi-tech machines to offer high-quality Stainless Steel Screws with optimized production.
                </p>
                <p className='text-p-tag'>
                R P STEEL produces all kinds of screws like CSK Self-tapping, Pan head, Wood screws, Phillips Head screws, Pan Phillips Combination with washer screws, Carriage bolts, Machine screws, Brass Plated Stainless Steel Screws, Antique Polish Stainless Steel Screw & SS Round wire Nails that are widely available through distributors/dealers network across India. 
                </p>

                <p className='text-p-tag'>
                R P STEEL in initial stage produced carbon steel & alloy steel screws. Around 1990 R P STEEL turned to specializing in stainless steel screws. 
                After years of hard work R P STEEL through its brand Omni has now become the leading manufacture in stainless steel screws whose products are sold across India.
                </p>
            </div>
            
            </Col>
            <Col xs={24} lg={8} className='col-imge-2'>
            <div className='certificate-text-div d-flex justify-content-center'>
               <img src="./certicate.jpg" className='img-fluid'/>
            </div>
            </Col>
        </Row>
    </div>
    
    </>
  )
}

export default AboutUS