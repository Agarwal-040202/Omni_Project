import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Input,Select, Space, Form } from "antd";
import Commonbackbutton from "../../CommonButtons/Commonbackbutton";




const SchemeModal = (props) => {


    const handleChange = () => {};
    const handleSubmit = (e) => {
      e.preventDefault();
    };
    const handleClose = () => {
      props.setShowPreDetailModal(false);
    };
  
    const showShopkeeperModal = () => {
      setShowModal(true);
    };
  
    // console.log("jkjkdfdfdkkj", props);


  return (
    <div>
        SchemeModal
        
        <div>
        <Modal
        show={props}
        onHide={handleClose}
        centered
        backdrop={false}
        size="lg"
        style={{zIndex:9}}
      >
        <Modal.Header
          closeButton
          closeVariant={"white"}
          style={{ backgroundColor: "maroon" }}
        >
          <Modal.Title style={{ color: "white" }}>Schrew Scheme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" mb-1">
            <Row className="d-flex justify-content-center">
              <Col
                span={24}
                xs={24}
                sm={24}
                md={24}
                lg={24}
                className="form-control"
              >
                <form
                onSubmit={handleSubmit}
                >
                  <Row className="">
                    <Col spn={24} lg={24} className=" w-100">
                      <Row>
                        <Col span={24} className="form-control  w-100">
                          <div>
                            <h6 className="info-tag-h6">
                              Add Scheme
                            </h6>
                          </div>

                          <Row>
                            <Col span={24} className="w-100">
                              <Input
                                type="text"
                                placeholder="Enter Pramry Address"
                                name="address"
                                autoComplete="off"
                                onChange={handleChange}
                                className="address-info-textbox"
                                value={address?.formattedAddress}
                                disabled={true}
                                style={{ color: "black" }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col span={24} className="d-flex justify-content-between">
                      <div>
                          <Commonbackbutton
                            backButtonText={"Cancel"}
                            backbuttonwidth={135}
                          />
                      </div>
                      <div>
                        <div>
                          <Button
                            type="submit"
                            style={{
                              backgroundColor: "maroon",
                              width: "140px",
                              border: "none",
                              height: "40px",
                            }}
                            disabled={showButton}
                          > 
                            Add Scheme
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
        </div>
        </div>
  )
}

export default SchemeModal