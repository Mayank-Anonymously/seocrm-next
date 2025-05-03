import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { GET_ALL_SUBSCRIBE_MAILS, baseURL } from "Components/helpers/url_helper";

const SubscibeMail = () => {
  const [subscibeMails,setSubscibeMails] = useState([]);
  // Columns definition
  const columns = useMemo(
    () => [
      { Header: "Email", accessor: "user.email" }
    ],
    []
  );
  const getAllSubscibeMails = async()=>{
    try {
        const response = await fetch(`${baseURL}${GET_ALL_SUBSCRIBE_MAILS}`);
        const data = await response.json();
        if (data && data.baseResponse.status === 1) {
            setSubscibeMails(data.response); 
        } else {
          console.error("Failed to fetch subscibe mails.");
        }
      } catch (error) {
        console.error("Error fetching subscibe mails:", error);
      }
  }
  useEffect(()=>{
    getAllSubscibeMails();
  },[])
  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">All Subscibe Mail</h4>
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
              {subscibeMails.length > 0 ? (
                subscibeMails.map((row: any) => (
                  <tr key={row._id}>
                    <td>{row.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No Subscibe Mails available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SubscibeMail;
