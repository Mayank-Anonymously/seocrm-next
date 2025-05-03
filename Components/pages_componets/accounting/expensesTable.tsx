import React, { useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import axios from "axios";
import {
  GET_ALL_EXPENSES,
  baseURL,
} from "../../../Components/helpers/url_helper";

const ExpensesTable = () => {
  const [expenses,setExpenses] = useState([]);
  const data = [
    {
      srNo: 1,
      expensesName: "Expense 1",
      expensesUserName: "User 1",
      expensesBillNo: "B001",
      expensesBillDate: "2024-05-26",
      amountWithoutTax: "1000",
      expensesSgst: "50",
      expensesCgst: "50",
      expensesIgst: "100",
      expensesResion: "Reason 1",
      expensesAmountWithTax: "1200",
      expensesPaymentType: "Paid",
      expensesPaymentUtrNo: "UTR001",
    },
    {
      srNo: 2,
      expensesName: "Expense 2",
      expensesUserName: "User 2",
      expensesBillNo: "B002",
      expensesBillDate: "2024-05-26",
      amountWithoutTax: "2000",
      expensesSgst: "100",
      expensesCgst: "100",
      expensesIgst: "200",
      expensesResion: "Reason 2",
      expensesAmountWithTax: "2400",
      expensesPaymentType: "Pending",
      expensesPaymentUtrNo: "",
    },
  ];
  const getAllExpenses = async()=>{
    const data:any = await axios(`${baseURL}${GET_ALL_EXPENSES}`);
    const {baseResponse,response}:any = data;
    setExpenses(response);
  }

  useEffect(()=>{
    getAllExpenses();
  },[])
  return (
    <div>
      <Col xl={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SR NO</th>
              <th>EXPENSES NAME</th>
              <th>EXPENSES USER NAME</th>
              <th>EXPENSES BILL NO</th>
              <th>EXPENSES BILL DATE</th>
              <th>AMOUNT WITHOUT TAX (C31)</th>
              <th>EXPENSES SGST (C32)</th>
              <th>EXPENSES CGST (C33)</th>
              <th>EXPENSES IGST (C34)</th>
              <th>EXPENSES RESION</th>
              <th>EXPENSES AMOUNT WITH TAX (C35)</th>
              <th>EXPENSES PAYMENT TYPE</th>
              <th>EXPENSES PAYMENT UTR NO</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item:any,index:any) => (
              <tr key={item._id}>
                <td>{++index}</td>
                <td>{item.expensesName}</td>
                <td>{item.expensesUserName}</td>
                <td>{item.bill_no}</td>
                <td>{item.bill_date}</td>
                <td>{item.total_amount_without_tax}</td>
                <td>{item.sgst}</td>
                <td>{item.cgst}</td>
                <td>{item.igst}</td>
                <td>{item.expensesResion}</td>
                <td>{item.total_amount_with_tax}</td>
                <td>success</td>
                <td>12345</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </div>
  );
};

export default ExpensesTable;
