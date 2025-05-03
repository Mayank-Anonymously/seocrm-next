import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap";
import {GET_ALL_PARTNER, baseURL } from "Components/helpers/url_helper";
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

const PaymentHistory = ({ partnerId }: any) => {
    const [partners, setPartners] = useState<Partner[]>([]);
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
    
      useEffect(() => {
        fetchPartners();
      }, []);

  // Filter the data to get the specific user's data
  const partner:any = partners.find((partner: any) => partner._id === partnerId);

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "SNo", accessor: "sno" },
      { Header: "Ref Id", accessor: "refid" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Remark", accessor: "remark" },
    ];
    return baseColumns;
  }, [partner]);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Payment History</h4>
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
            {partner?.transactions?.length > 0 ? (
                partner.transactions.map((transaction:any, index:any) => (
                    <tr key={index}>
                    <td>{++index}</td>
                    <td>{transaction.ref_id}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.remark}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={columns.length} className="text-center">
                    No transactions available
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

export default PaymentHistory;
