import React, { useEffect, useMemo } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders } from "Components/slices/order/thunk";
import moment from "moment";

const BottleBreak = () => {
  const dispatch: any = useDispatch();

  const data = useSelector((state: any) => state.order.data || []);

  useEffect(() => {
    dispatch(GetAllOrders());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { Header: "User Name", accessor: "user_name" },
      { Header: "Bottle Collected", accessor: "bottle_collect" },
      { Header: "Bottle Pending", accessor: "bottle_pending" },
      { Header: "Penalty", accessor: "penalty" },
      {
        Header: "Bottle Collected Date",
        accessor: (row: any) => moment(row.createdAt).format("Do MMM YY"),
      },
      // { Header: "Status", accessor: "status" },
    ],
    []
  );

  // Static data entry
  const staticData = [
    {
      user_name: "John Doe",
      bottle_collect: 5,
      bottle_pending: 3,
      penalty: "10",
      createdAt: new Date(),
    },
    // Add more static data entries as needed
  ];

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">User Details</h4>
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
              {data.length > 0
                ? data.map((row: any) => (
                    <tr key={row.order_no}>
                      <td>{row.order_no}</td>
                      <td>{row.amount}</td>
                      <td>{moment(row.createdAt).format("Do MMM YY")}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))
                : staticData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.user_name}</td>
                      <td>{row.bottle_collect}</td>
                      <td>{row.bottle_pending}</td>
                      <td>{row.penalty}</td>
                      <td>{moment(row.createdAt).format("Do MMM YY")}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BottleBreak;
