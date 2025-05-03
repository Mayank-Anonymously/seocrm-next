import { selected_is_success } from "Components/slices/membership/reducer";
import { GetMembership } from "Components/slices/membership/thunk";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AccountingTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = useSelector((state: any) => ({
    data: state.membership.data,
  }));

  useEffect(() => {
    // dispatch(GetMembership());
  }, [dispatch]);

  return (
    <div>
      <Col xl={12}>
        {data && data.length > 0 ? (
          data.map((item: any) => (
            <Row key={item._id} className="mb-4">
              {item.membershipDetails.map((itex: any) => (
                <Col md={6} key={itex.membershipTitle}>
                  <Card style={{ padding: 10 }}>
                    <div className="text-center card-styles">
                      <h6>{itex.membershipTitle}</h6>
                    </div>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/accounting/edit-accounting/${item._id}`);
                        dispatch(selected_is_success(item));
                      }}
                    >
                      <i className="bi bi-pen"></i>
                    </span>
                    {itex.details.map((itz: any, index: number) => (
                      <Row key={index} className="mb-2">
                        <Col md={6}>
                          <div>
                            <span>Total Sale</span>
                            <span>: {itz.totalSale}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <span>Total Amount</span>
                            <span>: {itz.totalAmount}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <span>Total Refund</span>
                            <span>: {itz.totalRefund}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <span>Offer Balance</span>
                            <span>: {itz.offerBalance}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <span>Add Purchase</span>
                            <span>: {itz.addPurchase}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <span>Add Expenses</span>
                            <span>: {itz.addExpenses}</span>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div>
                            <span>Total Balance</span>
                            <span>: {itz.totalBalance}</span>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </Card>
                </Col>
              ))}
            </Row>
          ))
        ) : (
          <p>No Accounting data available.</p>
        )}
      </Col>
    </div>
  );
};

export default AccountingTable;
