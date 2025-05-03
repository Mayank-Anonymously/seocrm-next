import React from "react";
import { Col, Table } from "react-bootstrap";

const TotalTax = () => {
  const data = [
    {
      srNo: 1,
      date: "2024-05-26",
      totalTaxExpectedByCompany: "500",
      totalTaxGivenByCompany: "350",
    },
    {
      srNo: 2,
      date: "2024-05-27",
      totalTaxExpectedByCompany: "700",
      totalTaxGivenByCompany: "450",
    },
  ];

  return (
    <div>
      <Col xl={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SR NO</th>
              <th>DATE</th>
              <th>(C36) TOTAL TAX EXPECTED BY COMPANY (T4+T8)</th>
              <th>(C37) TOTAL TAX GIVEN BY COMPANY (C26+C27+C28+C32+C33+C34)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.srNo}>
                <td>{item.srNo}</td>
                <td>{item.date}</td>
                <td>{item.totalTaxExpectedByCompany}</td>
                <td>{item.totalTaxGivenByCompany}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </div>
  );
};

export default TotalTax;
