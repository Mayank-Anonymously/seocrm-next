import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Modal, Table,Form } from "react-bootstrap";
import { DEFINE_ROUTE, GET_ALL_PARTNER, baseURL } from "Components/helpers/url_helper";
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
}

const OrderAssign = ({ partnerId }: any) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false); // Separate state for Product Modal
  const [showRouteModal, setShowRouteModal] = useState(false); // Separate state for Route Modal

  const fetchPartners = async () => {
    try {
      const response = await fetch(`${baseURL}${GET_ALL_PARTNER}`);
      const data = await response.json();
      console.log("Full response:", data); // Log the entire response
      if (data && data.baseResponse.status === 1) {
        setPartners(data.response); // Set partners directly from response
      } else {
        console.error("Failed to fetch partners.");
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };
  const [formData, setFormData] = useState({
    route: ''
  });
  const [order_id,setOrderId] = useState("");

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!formData.route) {
      Swal.fire({
        title: "error",
        text: "Route are required.",
        icon: "error",
      });
    }
    try {
      const options = {
        url: `${baseURL}${DEFINE_ROUTE}${order_id}`,
        method: "POST",
        data: formData
      };
      const fetchapi = await axios.request(options);
      const resp: any = await fetchapi;
      const { response, baseResponse } = resp;
      console.log(baseResponse)
      if(baseResponse.status==1)
      {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        fetchPartners();
        handleCloseRouteModal(); 
        setFormData({
          route: ''
        });
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

  useEffect(() => {
    fetchPartners();
  }, []);

  const partner: any = partners.find((partner: any) => partner._id === partnerId);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "User Name", accessor: "username" },
      { Header: "Product details", accessor: "productdetails" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Status", accessor: "status" },
      { Header: "Delivery Date", accessor: "deliverydate" },
      { Header: "Payment Option", accessor: "paymentoption" },
      { Header: "Route", accessor: "route" },
      { Header: "Define Route", accessor: "defineroute" },
    ];
    return baseColumns;
  }, [partner]);

  // Handlers for Product Modal
  const handleShowProductModal = (products: any) => {
    setProducts(products);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setProducts([]);
  };

  // Handlers for Route Modal
  const handleShowRouteModal = (orderId:any) => {
    setOrderId(orderId)
    setShowRouteModal(true);
  };

  const handleCloseRouteModal = () => {
    setOrderId("");
    setShowRouteModal(false);
  };

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Order Assign</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.Header}>{column.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {partner?.orders?.length > 0 ? (
                partner.orders.map((order: any, index: any) => (
                  <tr key={index}>
                    <td>{order.user.name}</td>
                    <td>
                      <Button variant="link" onClick={() => handleShowProductModal(order.product)}>
                        Product details
                      </Button>
                    </td>
                    <td>{order.amount}</td>
                    <td>{order.status}</td>
                    <td>{order.deliveryDate}</td>
                    <td>{order.paymentOption}</td>
                    <td>{order.route}</td>
                    <td>
                      <Button variant="link" onClick={()=>{handleShowRouteModal(order._id)}}>
                        Define Route
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Product Modal */}
      {products && (
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product: any, index: any) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.selQty}</td>
                      <td>{product.price * product.selQty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No products available.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Route Modal */}
      {showRouteModal && (
        <Modal show={showRouteModal} onHide={handleCloseRouteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Define Route</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPayment">
                <Form.Label>Define Route</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Route"
                  name="route"
                  value={formData.route}
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

export default OrderAssign;
