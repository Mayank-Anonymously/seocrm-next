import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { FormikProvider, useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, FormFloating, Row } from "react-bootstrap";
import { CreateMembership } from "Components/slices/membership/thunk";

const Membershipform = () => {
  const dispatch: any = useDispatch();
  const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  const [membership, setMembership] = useState([
    {
      title: "",
      details: [
        {
          value: "",
          discount: "",
          status: "",
          validity: "",
        },
      ],
    },
  ]);
  const { category, subcat, locationData } = useSelector((state: any) => ({
    category: state.CategorySlice.categorydata,
    subcat: state.CategorySlice.subcat,
    locationData: state.location.locationData,
  }));

  const handleChange = (e: any, index: any, detailIndex: any) => {
    const { name, value } = e.target;
    if (name === "title") {
      setMembership((prevMembership) => {
        const updatedMembership = [...prevMembership];
        updatedMembership[index].title = value;
        return updatedMembership;
      });
    } else {
      const updatedMembership = membership.map((item, i) => {
        if (i === index) {
          const updatedDetails = item.details.map((detail, j) => {
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
      value: "",
      discount: "",
      status: "",
      validity: "",
    });
    setMembership(updatedMembership);
  };

  const removeReceipt = (index: any, detailIndex: any) => {
    const updatedMembership = [...membership];
    updatedMembership[index].details.splice(detailIndex, 1);
    setMembership(updatedMembership);
  };

  const handleSubmitMembership = () => {
    const isDetailsFull = membership.every((item) => item.details.length === 4);

    if (isDetailsFull) {
      const arrayToSubmit = membership.map((item) => ({
        membershipTitle: item.title,
        details: item.details.map((detail) => ({
          membershipValue: detail.value,
          membershipDiscount: detail.discount,
          membershipStatus: JSON.parse(detail.status),
          membershipValidity: detail.validity,
        })),
      }));
      dispatch(CreateMembership(arrayToSubmit));
    } else {
      console.log("Details length must reach 4 to submit");
    }
  };

  console.log("membership", membership);
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
                    name="title"
                    id="title"
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
                              name="value"
                              id="value"
                              className="form-control"
                              placeholder="Enter Coupon Value..."
                              type="text"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              value={detail.value}
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
                              name="discount"
                              id="discount"
                              className="form-control"
                              placeholder="Enter discount value..."
                              type="text"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              value={detail.discount}
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
                              name="validity"
                              id="validity"
                              className="form-control"
                              placeholder="Enter validity..."
                              type="text"
                              onChange={(e) =>
                                handleChange(e, index, detailIndex)
                              }
                              value={detail.validity}
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
                              name="status"
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

export default Membershipform;
