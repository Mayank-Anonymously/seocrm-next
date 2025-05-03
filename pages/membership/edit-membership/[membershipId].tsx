import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { FormikProvider, useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, FormFloating, Row } from "react-bootstrap";
import {
  CreateMembership,
  editMembership,
} from "Components/slices/membership/thunk";
import { useRouter } from "next/router";

const EditMembershipform = ({ membershipId }: any) => {
  const dispatch: any = useDispatch();
  const editorRef = useRef<any>();
  const router = useRouter();
  const [editor, setEditor] = useState(false);
  const { selected } = useSelector((state: any) => ({
    selected: state.membership.selected,
  }));

  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  let [membership, setMembership] = useState(selected.membershipDetails);
  const { category, subcat, locationData } = useSelector((state: any) => ({
    category: state.CategorySlice.categorydata,
    subcat: state.CategorySlice.subcat,
    locationData: state.location.locationData,
  }));

  const handleChange = (e: any, index: any, detailIndex: any) => {
    const { name, value } = e.target;
    if (name === "membershipTitle") {
      setMembership((prevMembership: any) => {
        let updatedMembership = prevMembership.map((item: any, i: any) => {
          if (i === index) {
            return { ...item, membershipTitle: value };
          }
          return item;
        });
        console.log(updatedMembership);
        return updatedMembership;
      });
    } else {
      const updatedMembership = membership.map((item: any, i: any) => {
        if (i === index) {
          const updatedDetails = item.details.map((detail: any, j: any) => {
            if (j === detailIndex) {
              return { ...detail, [name]: value };
            }
            return detail;
          });
          return { ...item, details: updatedDetails };
        }
        return item;
      });
      setMembership(updatedMembership);
    }
  };

  const addReceipt = (index: any) => {
    const updatedMembership = [...membership];
    updatedMembership[index].details.push({
      membershipValue: "",
      membershipDiscount: "",
      membershipStatus: "",
      membershipValidity: "",
    });
    setMembership(updatedMembership);
  };

  const removeReceipt = (index: any, detailIndex: any) => {
    const updatedMembership = [...membership];
    updatedMembership[index].details.splice(detailIndex, 1);
    setMembership(updatedMembership);
  };

  const handleSubmitMembership = () => {
    const isDetailsFull = membership.every(
      (item: any) => item.details.length === 4
    );

    if (isDetailsFull) {
      const arrayToSubmit = membership.map((item: any) => ({
        membershipTitle: item.membershipTitle,
        details: item.details.map((detail: any) => ({
          membershipValue: detail.membershipValue,
          membershipDiscount: detail.membershipDiscount,
          membershipStatus: JSON.parse(detail.membershipStatus),
          membershipValidity: detail.membershipValidity,
        })),
      }));

      dispatch(editMembership(arrayToSubmit, membershipId, router));
    } else {
      console.log("Details length must reach 4 to submit");
    }
  };

  console.log("membership", selected.membershipDetails);
  return (
    <>
      <div className="container-fluid">
        <Card>
          <Form
            id="contactlist-form"
            autoComplete="off"
            className="needs-formik p-2"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              return false;
            }}
          >
            <div className="d-flex flex-column gap-3">
              <Col>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    Title
                  </Form.Label>
                  <Form.Control
                    name="membershipTitle"
                    id="membershipTitle"
                    className="form-control"
                    placeholder="Enter Membership title..."
                    type="text"
                    onChange={(e) => handleChange(e, 0, 0)}
                    required
                  />
                </div>
              </Col>
              {membership.map((item: any, index: any) => {
                return (
                  <>
                    {item.details.map((detail: any, detailIndex: any) => (
                      <Row>
                        <Col>
                          <div>
                            <Form.Label htmlFor="name" className="form-label">
                              Value
                            </Form.Label>
                            <Form.Control
                              name="membershipValue"
                              id="membershipValue"
                              className="form-control"
                              placeholder="Enter Coupon Value..."
                              type="text"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              value={detail.membershipValue}
                              required
                            />
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <Form.Label htmlFor="name" className="form-label">
                              Discount
                            </Form.Label>
                            <Form.Control
                              name="membershipDiscount"
                              id="membershipDiscount"
                              className="form-control"
                              placeholder="Enter discount value..."
                              type="text"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              value={detail.membershipDiscount}
                              required
                            />
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <Form.Label htmlFor="name" className="form-label">
                              Validity
                            </Form.Label>
                            <Form.Control
                              name="membershipValidity"
                              id="membershipValidity"
                              className="form-control"
                              placeholder="Enter validity..."
                              type="text"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              value={detail.membershipValidity}
                              required
                            />
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <Form.Label htmlFor="name" className="form-label">
                              Status
                            </Form.Label>
                            <Form.Select
                              name="membershipStatus"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              required
                            >
                              <option selected>Open this select menu</option>
                              <option value={"true"}>Active</option>
                              <option value={"false"}>Inactive</option>
                            </Form.Select>
                          </div>
                        </Col>
                        <Col>
                          {item.details.length < 4 && (
                            <Row>
                              <Col>
                                <div
                                  style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    variant="primary"
                                    onClick={() => addReceipt(index)}
                                  >
                                    Add
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </>
                );
              })}

              <Button
                variant="secondary"
                type="submit"
                onClick={() => handleSubmitMembership()}
              >
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export const getServerSideProps = (context: any) => {
  const { membershipId } = context.query;

  return { props: { membershipId } };
};

export default EditMembershipform;
