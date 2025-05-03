import React, { useEffect, useState } from "react";
import {Card, Col, Dropdown, Table,Button, Modal,Form  } from "react-bootstrap";
import {GET_ALL_PARTNER, baseURL,UPDATE_PARTNER_GIVEN_AMOUNT_BY_ID } from "Components/helpers/url_helper";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

interface Partner {
  _id: string;
  city: {
    cityName: string;
  };
  hub: {
    hubName: string;
  };
  name: string;
  email: string;
  contact: string;
  address: string;
  orders?: {
    user: {
      name: string;
    };
    status: string;
    deliveryDate: string;
    amount: number;
    paymentOption: string;
  }[];
  collected_amount:number;
  given_amount:number;
}

const Partnertable: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnerId,setPartnerId] = useState("");
  console.log(partnerId,"er")
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    paymentAmount: '',
    remark: '',
  });

  const handleShowModal = (purches_id:any) => {
    setPartnerId(purches_id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      paymentAmount: '',
      remark: '',
    });
    setPartnerId("");
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!formData.paymentAmount || !formData.remark) {
      Swal.fire({
        title: "error",
        text: "All fields are required.",
        icon: "error",
      });
    }
    try {
      const options = {
        url: `${baseURL}${UPDATE_PARTNER_GIVEN_AMOUNT_BY_ID}${partnerId}`,
        method: "POST",
        data: formData
      };
      const fetchapi = await axios.request(options);
      const resp: any = await fetchapi;
      const { response, baseResponse } = resp;
      if(baseResponse.status==1)
      {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        handleCloseModal(); 
        setFormData({
          paymentAmount: '',
          remark: '',
        });
        setPartnerId("");
      }
      else{
        Swal.fire({
          title: "error",
          text: baseResponse.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await fetch(`${baseURL}${GET_ALL_PARTNER}`);
      const data = await response.json();
      
      console.log("Full response:", data); // Log the entire response

      // Check the response structure
      if (data && data.baseResponse.status === 1) {
        setPartners(data.response); // Set partners directly from response
      } else {
        console.error("Failed to fetch partners.");
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  console.log("partners"+partners)

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header className="align-items-center d-flex mb-n2">
          <h4 className="card-title mb-0 flex-grow-1">Partners</h4>
          <div className="flex-shrink-0">
            <Dropdown className="card-header-dropdown">
              <Dropdown.Toggle
                variant="link-dark"
                className="text-reset dropdown-btn arrow-none p-0"
              >
                <span className="fw-semibold text-uppercase fs-12">Sort by:</span>
                <span className="text-muted">Today<i className="mdi mdi-chevron-down ms-1"></i></span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">Today</Dropdown.Item>
                <Dropdown.Item href="#">Yesterday</Dropdown.Item>
                <Dropdown.Item href="#">Last 7 Days</Dropdown.Item>
                <Dropdown.Item href="#">Last 30 Days</Dropdown.Item>
                <Dropdown.Item href="#">This Month</Dropdown.Item>
                <Dropdown.Item href="#">Last Month</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>City Name</th>
                <th>Hub Name</th>
                <th>Partner Name</th>
                <th>Partner Email</th>
                <th>Order Assign</th>
                <th>Partner Contact</th>
                <th>Partner Address</th>
                <th>Collected Amount</th>
                <th>Given Amount</th>
                <th>Pending Amount</th>
                <th>Payment</th>
                <th>Payment History</th>
              </tr>
            </thead>
            <tbody>
              {partners.length > 0 ? (
                partners.map((partner: Partner) => (
                  <tr key={partner._id}>
                    <td>{partner.city.cityName}</td>
                    <td>{partner.hub.hubName}</td>
                    <td>
                        {partner.name}
                    </td>
                    <td>{partner.email}</td>
                    <td>
                      <Link href={`/partner/order-assign/${partner._id}`} legacyBehavior>
                        <a>Order Assign</a>
                      </Link>
                    </td>
                    <td>{partner.contact}</td>
                    <td>{partner.address}</td>
                    <td>{partner.collected_amount}</td>
                    <td>{partner.given_amount}</td>
                    <td>{partner.collected_amount - partner.given_amount}</td>
                    <td>
                        <Button variant="link" onClick={() => handleShowModal(partner._id)}>
                            payment
                        </Button>
                    </td>
                    <td>
                      <Link href={`/partner/payment-history/${partner._id}`} legacyBehavior>
                        <a>payment history</a>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No Partner Details available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPayment">
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter payment amount"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formRemark" className="mt-3">
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Col>
  );
};

export default Partnertable;
