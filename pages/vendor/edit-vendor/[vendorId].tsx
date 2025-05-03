import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  GET_VENDOR,
  UPDATE_VENDOR,
  baseURL
} from "../../../Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

const VendorEditForm = () => {
  const params = useParams();
  const id = params?.vendorId;
  const dispatch: any = useDispatch();
  const [vendor, setVendor] = useState([
    {
      name: "",
      email: "",
      mobile: "",
    },
  ]);

  const handleChange = (e: any, index: any) => {
    const { name, value } = e.target;
    setVendor((prevvendor: any) => {
      const updatedvendor: any = [...prevvendor];
      updatedvendor[index][name] = value;
      return updatedvendor;
    });
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const options = {
        url: `${baseURL}${UPDATE_VENDOR}${id}`,
        method: "PATCH",
        data: vendor
      };
      const fetchapi = await axios.request(options);
      const resp: any = await fetchapi;
      const { response, baseResponse } = resp;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
      }else if (baseResponse.status === 0) {
        Swal.fire({
          title: "error",
          text: baseResponse.message,
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: error,
        text: error,
        icon: "error",
      });
    }
  };
  const getVendorData = async()=>{
    try{
        const options = {
        url: `${baseURL}${GET_VENDOR}${id}`,
        method: "GET",
        };
        const fetchapi = await axios.request(options);
        const resp: any = await fetchapi;
        const { response, baseResponse } = resp;
        setVendor([
            {
              name: response.name,
              email: response.email,
              mobile: response.mobile,
            },
          ])
    }catch(error){
        console.log("something went wrong");
    }
  }
  useEffect(()=>{
    getVendorData();
  },[])

  return (
    <div className="container-fluid">
      <Card>
        <Form
          id="contactlist-form"
          autoComplete="off"
          className="needs-formik p-2"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column gap-3">
            {vendor.map((item, index) => (
              <div key={index}>
                <Row className="mb-3">
                  <Col>
                    <Form.Label htmlFor={`name${index}`} className="form-label">
                      Name
                    </Form.Label>
                    <Form.Control
                      name="name"
                      id={`name${index}`}
                      placeholder="Enter Name..."
                      type="text"
                      onChange={(e) => handleChange(e, index)}
                      value={item.name}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label
                      htmlFor={`email${index}`}
                      className="form-label"
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      name="email"
                      id={`email${index}`}
                      placeholder="Enter Email..."
                      type="email"
                      onChange={(e) => handleChange(e, index)}
                      value={item.email}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label
                      htmlFor={`mobile${index}`}
                      className="form-label"
                    >
                      Mobile
                    </Form.Label>
                    <Form.Control
                      name="mobile"
                      id={`mobile${index}`}
                      placeholder="Enter Mobile..."
                      type="text"
                      onChange={(e) => handleChange(e, index)}
                      value={item.mobile}
                      required
                    />
                  </Col>
                </Row>
              </div>
            ))}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default VendorEditForm;
