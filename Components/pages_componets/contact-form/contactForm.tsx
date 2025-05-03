import React, { useEffect, useMemo, useState } from "react";
import { Table, Card, Col } from "react-bootstrap";
import { GET_ALL_CONTACT_FORM, baseURL } from "Components/helpers/url_helper";

const contactFormPage = () => {
    const [contactForms,setContactForms] = useState([]);
  // Columns definition
  const columns = useMemo(
    () => [
      { Header: "name", accessor: "user.name" },
      { Header: "Email", accessor: "user.email" },
      { Header: "Mobile", accessor: "user.phone" },
      { Header: "Message", accessor: "user.message" },
    ],
    []
  );
  const getAllContactForms = async()=>{
    try {
        const response = await fetch(`${baseURL}${GET_ALL_CONTACT_FORM}`);
        const data = await response.json();
        if (data && data.baseResponse.status === 1) {
            setContactForms(data.response); 
        } else {
          console.error("Failed to fetch contact forms.");
        }
      } catch (error) {
        console.error("Error fetching contact forms:", error);
      }
  }
  useEffect(()=>{
    getAllContactForms();
  },[])
  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">All Contact From</h4>
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
              {contactForms.length > 0 ? (
                contactForms.map((row: any) => (
                  <tr key={row._id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No Form Data available.
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

export default contactFormPage;
