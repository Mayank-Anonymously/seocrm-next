import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import {
  GET_TOTAL_SALE_WITHOUT_VIP,
  baseURL,
} from "../../../Components/helpers/url_helper";

const TotalSaleWithOutVip = () => {
  const router = useRouter();
  const [sales,setSales] = useState([]);
  const getTotalSaleWithVip = async()=>{
    try{
      const data:any = await axios(`${baseURL}${GET_TOTAL_SALE_WITHOUT_VIP}`);
      const {baseResponse,response}:any = data;
      setSales(response);
    }catch(error){
      console.log("something went wrong");
    }
  }
  useEffect(()=>{
    getTotalSaleWithVip();
  },[])
  
  const data = [
    {
      id: 1,
      productName: "Product 1",
      unit: "10",
      unitPrice: "100",
      totalAmountWithoutTax: "1000",
      sgstT1: "50",
      sgstT2: "50",
      igstT3: "100",
      taxAmountT4: "200",
      totalAmountWithTax: "1200",
    },
    {
      id: 2,
      productName: "Product 2",
      unit: "5",
      unitPrice: "200",
      totalAmountWithoutTax: "1000",
      sgstT1: "50",
      sgstT2: "50",
      igstT3: "100",
      taxAmountT4: "200",
      totalAmountWithTax: "1200",
    },
  ];

  return (
    <div>
      <Col xl={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SR NO</th>
              <th>Product name</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Total amount (without tax)</th>
              <th>SGST (T1)</th>
              <th>SGST (T2)</th>
              <th>IGST (T3)</th>
              <th>Tax amount (T4)</th>
              <th>Total amount (with tax) (C7)</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((item:any,index) => (
                <tr key={item._id}>
                  <td>{++index}</td>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.total_amount_without_tax}</td>
                  <td>{item.sgst}</td>
                  <td>{item.cgst}</td>
                  <td>{item.igst}</td>
                  <td>{item.total_tax}</td>
                  <td>{item.total_amount_with_tax}</td>
                </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </div>
  );
};

export default TotalSaleWithOutVip;
