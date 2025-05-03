import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Table } from "react-bootstrap";
import axios from "axios";
import {
  GET_ALL_PURCHAES,
  baseURL,
} from "../../../Components/helpers/url_helper";

const PurchaseTable = () => {
  const router = useRouter();
  const [purchses,setPurchses] = useState([]);
  const data = [
    {
      srNo: 1,
      vendorName: "Vendor 1",
      productName: "Product 1",
      billDate: "2024-05-26",
      productQuantity: "10",
      productPrice: "100",
      billNo: "B001",
      sgst: "50",
      cgst: "50",
      igst: "100",
      totalAmountWithoutTax: "1000",
      totalAmountWithTax: "1200",
      paymentStatus: "Paid",
      paymentUTRNo: "UTR001",
    },
    {
      srNo: 2,
      vendorName: "Vendor 2",
      productName: "Product 2",
      billDate: "2024-05-26",
      productQuantity: "5",
      productPrice: "200",
      billNo: "B002",
      sgst: "50",
      cgst: "50",
      igst: "100",
      totalAmountWithoutTax: "1000",
      totalAmountWithTax: "1200",
      paymentStatus: "Pending",
      paymentUTRNo: "",
    },
  ];

  const getAllPurchase = async()=>{
    const data:any = await axios(`${baseURL}${GET_ALL_PURCHAES}`);
    const {baseResponse,response}:any = data;
    setPurchses(response);
  }

  useEffect(()=>{
    getAllPurchase();
  },[])

  return (
    <div>
      <Col xl={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SR NO</th>
              <th>Vendor Name</th>
              <th>Product Name</th>
              <th>Bill Date</th>
              <th>Product Quantity</th>
              <th>Product Price</th>
              <th>Bill No</th>
              <th>SGST (C26)</th>
              <th>CGST (C27)</th>
              <th>IGST (C28)</th>
              <th>Total Amount Without Tax (C29)</th>
              <th>Total Amount With Tax (C30)</th>
              <th>Payment Status</th>
              <th>Payment UTR No</th>
            </tr>
          </thead>
          <tbody>
            {purchses?.map((item:any,index:any) => (
              <tr key={item._id}>
                <td>{++index}</td>
                <td>{item.vendor.name}</td>
                <td>{item.product_name}</td>
                <td>{item.bill_date}</td>
                <td>{item.product_qty}</td>
                <td>{item.product_price}</td>
                <td>{item.bill_no}</td>
                <td>{item.sgst}</td>
                <td>{item.cgst}</td>
                <td>{item.igst}</td>
                <td>{item.total_amount_without_tax}</td>
                <td>{item.total_amount_with_tax}</td>
                <td>{item.status}</td>
                <td>12345</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </div>
  );
};

export default PurchaseTable;
