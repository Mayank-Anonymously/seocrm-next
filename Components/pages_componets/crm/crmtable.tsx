import { selected_is_success } from "Components/slices/membership/reducer";
import { GetMembership } from "Components/slices/membership/thunk";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const CrmTable = () => {
  const router = useRouter();
  const { data } = useSelector((state: any) => ({
    data: state.membership.data,
  }));
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(GetMembership());
  }, []);

  return (
    <div>
      <Col xl={14}>
        <>
          {data.map((item: any) => {
            return (
              <Row>
                {item.membershipDetails.map((itex: any) => {
                  return (
                    <Col md={5}>
                      <Card style={{ padding: 10 }}>
                        <>
                          <div className="text-center card-styles">
                            <h6>{itex.membershipTitle}</h6>
                          </div>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              router.push(
                                `/membership/edit-membership/${item._id}`
                              );
                              dispatch(selected_is_success(item));
                            }}
                          >
                            <i className="bi bi-pen"></i>
                          </span>
                        </>
                        {itex.details.map((itz: any) => {
                          return (
                            <Row>
                              <Col md={4}>
                                <div>
                                  <span>Value</span>
                                  <span>: {itz.membershipValue}</span>
                                </div>
                              </Col>
                              <Col md={4}>
                                <div>
                                  <span>discount</span>
                                  <span>: {itz.membershipDiscount}</span>
                                </div>
                              </Col>
                              <Col md={4}>
                                <div>
                                  <span>Validity</span>
                                  <span>: {itz.membershipValidity}</span>
                                </div>
                              </Col>
                            </Row>
                          );
                        })}
                        <Col></Col>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </>
      </Col>
    </div>
  );
};

export default CrmTable;
