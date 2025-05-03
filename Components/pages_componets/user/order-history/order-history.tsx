import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "Components/slices/user/thunk";
import moment from "moment";

const OrderHistory = ({ userId }: any) => {
  const dispatch: any = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProductdetails, setSelectedProductdetails] = useState<any>(null);

  const data = useSelector((state: any) => state.user.userdata || []);

  useEffect(() => {
    dispatch(GetAllUser());
  }, [dispatch]);

  // Filter the data to get the specific user's data
  const user = data.find((user: any) => user._id === userId);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "OrderId", accessor: "orderid" },
      { Header: "Order Time", accessor: "ordertime" },
      { Header: "Product details", accessor: "productdetails" },
      { Header: "Sub Total", accessor: "subtotal" },
      { Header: "Payment Option", accessor: "paymentoption" },
      { Header: "Order status", accessor: "orderstatus" },
    ];
    return baseColumns;
  }, [user]);

  const handleShowModal = (products:any) => {
    setSelectedProductdetails(products);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductdetails(null);
  };

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Order History</h4>
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
                {user.orders.length > 0 ? (
                    <>
                        {user?.orders?.map((order: any) => (
                            <tr key={order._id}>
                                <td>{order.order_no}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>
                                    <Button variant="link" onClick={() => handleShowModal(order.product)}>
                                        View
                                    </Button>
                                </td>
                                <td>{order.amount}</td>
                                <td>{order.paymentOption}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </>
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            User order history not found
                        </td>
                    </tr>
                )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {selectedProductdetails && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Amount</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedProductdetails && selectedProductdetails.length > 0 ? (
                  selectedProductdetails.map((product:any, index:any) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.selQty}</td>
                      <td>{product.price * product.selQty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No orders available.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Col>
  );
};

export default OrderHistory;
