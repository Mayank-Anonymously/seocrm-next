import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CreateMembership } from "Components/slices/membership/thunk";
import {
  CREATE_NEW_VENDOR,
  baseURL
} from "../../../Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";

const VendorForm = () => {
  const dispatch: any = useDispatch();
  const [membership, setMembership] = useState([
    {
      name: "",
      email: "",
      mobile: "",
    },
  ]);

  const handleChange = (e: any, index: any) => {
    const { name, value } = e.target;
    setMembership((prevMembership: any) => {
      const updatedMembership: any = [...prevMembership];
      updatedMembership[index][name] = value;
      return updatedMembership;
    });
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const options = {
        url: `${baseURL}${CREATE_NEW_VENDOR}`,
        method: "POST",
        data: membership
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
        setMembership([
          {
            name: "",
            email: "",
            mobile: "",
          },
        ]);
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

  const addRow = () => {
    setMembership((prevMembership: any) => {
      const updatedMembership: any = [...prevMembership];
      updatedMembership.push({
        name: "",
        email: "",
        mobile: "",
      });
      return updatedMembership;
    });
  };

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
            {membership.map((item, index) => (
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
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default VendorForm;
