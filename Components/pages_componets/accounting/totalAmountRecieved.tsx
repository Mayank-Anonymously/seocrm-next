import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Col, Table, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import {
  GET_ALL_AMOUNT,
  baseURL,
} from "../../../Components/helpers/url_helper";

const TotalAmountRecieved = () => {
  const router = useRouter();
  const tableRef = useRef(null);
  const [amounts,setAmounts] = useState([]);
  
  const data = [
    {
      id: 1,
      date: "2023-05-01",
      onlineC15: "Online Value 1",
      byCashC16: "Cash Value 1",
      onlineC17: "Online Value 2",
      walletC18: "Wallet Value 1",
      onlineC19: "Online Value 2",
      cashOnDeliveryC19: "Cash on Delivery Value 1",
    },
    {
      id: 2,
      date: "2023-05-02",
      onlineC15: "Online Value 3",
      byCashC16: "Cash Value 2",
      onlineC17: "Online Value 4",
      walletC18: "Wallet Value 2",
      onlineC19: "Online Value 4",
      cashOnDeliveryC19: "Cash on Delivery Value 2",
    },
  ];

  const handleDownloadPDF = () => {
    const input = tableRef.current;
    if (!input) return; // Guard clause for null reference

    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
      const imgWidth = 297;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("table.pdf");
    });
  };

  const getAllAmount = async()=>{
    const data:any = await axios(`${baseURL}${GET_ALL_AMOUNT}`,{
      method:"POST",
      data: {}
    });
    const {baseResponse,response}:any = data;
    setAmounts(response);
  }

  useEffect(()=>{
    getAllAmount();
  },[])

  return (
    <div>
      <Col xl={12}>
        <Button variant="primary" onClick={handleDownloadPDF}>Download PDF</Button>
        <div ref={tableRef}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={4} className="text-center">Wallet Recharge</th>
                <th colSpan={1} className="text-center">VIP Membership</th>
                <th colSpan={3} className="text-center">Order</th>
              </tr>
              <tr>
                <th>SR NO</th>
                <th>Date</th>
                <th>Online (C15)</th>
                <th>By Cash (C16)</th>
                <th>Online (C17)</th>
                <th>Wallet (C18)</th>
                <th>Online (C19)</th>
                <th>Cash on Delivery (C20)</th>
              </tr>
            </thead>
            <tbody>
              {amounts.map((item:any,index:any) => (
                <tr key={item._id}>
                  <td>{++index}</td>
                  <td>{item.date}</td>
                  <td>{item.onlineC15}</td>
                  <td>{item.byCashC16}</td>
                  <td>{item.membershipOnlineSales}</td>
                  <td>{item.wallet}</td>
                  <td>{item.online}</td>
                  <td>{item.cashOnDelivery}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </div>
  );
};

export default TotalAmountRecieved;
