import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CreateMembership } from "Components/slices/membership/thunk";

const AccountingForm = () => {
  const dispatch = useDispatch();
  const [membership, setMembership] = useState([
    {
      details: [
        {
          totalSale: "",
          totalAmount: "",
          totalRefund: "",
          offerBalance: "",
          addPurchase: "",
          addExpenses: "",
        },
      ],
    },
  ]);

  const handleChange = (e: any, index: any, detailIndex: any) => {
    const { name, value } = e.target;
    setMembership((prevMembership) => {
      const updatedMembership: any = [...prevMembership];
      if (name === "title") {
        updatedMembership[index].title = value;
      } else {
        updatedMembership[index].details[detailIndex][name] = value;
      }
      return updatedMembership;
    });
  };

  const calculateTotalBalance = (detail: any) => {
    const { totalAmount, addPurchase, addExpenses, totalRefund, offerBalance } =
      detail;
    return (
      parseFloat(totalAmount || 0) -
      (parseFloat(addPurchase || 0) +
        parseFloat(addExpenses || 0) +
        parseFloat(totalRefund || 0) +
        parseFloat(offerBalance || 0))
    ).toFixed(2);
  };

  const handleSubmit = () => {
    const arrayToSubmit: any = membership.map((item: any) => ({
      membershipTitle: item.title,
      details: item.details.map((detail: any) => ({
        totalSale: detail.totalSale,
        totalAmount: detail.totalAmount,
        totalRefund: detail.totalRefund,
        offerBalance: detail.offerBalance,
        addPurchase: detail.addPurchase,
        addExpenses: detail.addExpenses,
        totalBalance: calculateTotalBalance(detail),
      })),
    }));
    // dispatch(CreateMembership(arrayToSubmit));
  };

  return (
    <div className="container-fluid">
      <Card>
        <Form
          id="contactlist-form"
          autoComplete="off"
          className="needs-formik p-2"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="d-flex flex-column gap-3">
            {membership.map((item, index) => (
              <div key={index}>
                {item.details.map((detail, detailIndex) => (
                  <Row key={detailIndex} className="mb-3">
                    <Col>
                      <Form.Label htmlFor="totalSale" className="form-label">
                        Total Sale
                      </Form.Label>
                      <Form.Control
                        name="totalSale"
                        id="totalSale"
                        placeholder="Enter Total Sale..."
                        type="text"
                        onChange={(e) => handleChange(e, index, detailIndex)}
                        value={detail.totalSale}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="totalAmount" className="form-label">
                        Total Amount
                      </Form.Label>
                      <Form.Control
                        name="totalAmount"
                        id="totalAmount"
                        placeholder="Enter Total Amount..."
                        type="text"
                        onChange={(e) => handleChange(e, index, detailIndex)}
                        value={detail.totalAmount}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="totalRefund" className="form-label">
                        Total Refund
                      </Form.Label>
                      <Form.Control
                        name="totalRefund"
                        id="totalRefund"
                        placeholder="Enter Total Refund..."
                        type="text"
                        onChange={(e) => handleChange(e, index, detailIndex)}
                        value={detail.totalRefund}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="offerBalance" className="form-label">
                        Offer Balance
                      </Form.Label>
                      <Form.Control
                        name="offerBalance"
                        id="offerBalance"
                        placeholder="Enter Offer Balance..."
                        type="text"
                        onChange={(e) => handleChange(e, index, detailIndex)}
                        value={detail.offerBalance}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="addPurchase" className="form-label">
                        Add Purchase
                      </Form.Label>
                      <Form.Control
                        name="addPurchase"
                        id="addPurchase"
                        placeholder="Enter Add Purchase..."
                        type="text"
                        onChange={(e) => handleChange(e, index, detailIndex)}
                        value={detail.addPurchase}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="addExpenses" className="form-label">
                        Add Expenses
                      </Form.Label>
                      <Form.Control
                        name="addExpenses"
                        id="addExpenses"
                        placeholder="Enter Add Expenses..."
                        type="text"
                        onChange={(e) => handleChange(e, index, detailIndex)}
                        value={detail.addExpenses}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label className="form-label">
                        Total Balance
                      </Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={calculateTotalBalance(detail)}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            ))}
            <Button variant="secondary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AccountingForm;
