import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllCategory,
  PostSubCategory,
} from "Components/slices/category/thunk";
import { Card, Col, Row } from "react-bootstrap";
import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import { AssigneOrder, UpdateOrder } from "Components/slices/order/thunk";
import { GetAllHubs } from "Components/slices/hub/thunk";
import { GetAllPartner } from "Components/slices/partner/thunk";

const status = [
  "DELIVERED",
  "ORDERED",
  "ONTHEEWAY",
  "PROCCESSING",
  "FAILED",
  "DECLINED",
  "ASSIGNED",
];
const UpdateStatus = () => {
  const dispatch: any = useDispatch();
  const [showStatus, setShowStatus] = useState(true);
  const { selectedorder, partnerData } = useSelector((state: any) => ({
    selectedorder: state.order.selectedorder,
    partnerData: state.partner.partnerData,
  }));
  const [StartDate,setStartDate] = useState(moment(selectedorder.deliveryDate, "Do MMM YYYY").format("YYYY-MM-DD"));

  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderstatus: "",
      partner: "",
    },
    validationSchema: Yup.object({
      orderstatus: Yup.string().required("Please update status"),
    }),
    onSubmit: (values) => {
      dispatch(AssigneOrder(selectedorder._id, values,moment(StartDate, "YYYY-MM-DD").format("Do MMM YY"), setShowStatus));
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetAllPartner());
  }, []);

  // const toPay = () => {
  //   return selectedorder.product.reduce((prev: any, current: any) => {
  //     current.price - (current.price * current.selQty) / 100;

  //     return discountedPrice;
  //   }, 0);
  // };

  const cartTotal = () => {
    return selectedorder.product.reduce(function (prev: any, current: any) {
      var price = "";

      price = prev + current.price * current.selQty;

      return price;
    }, 0);
  };
console.log("partnerDatapartnerData"+JSON.stringify(partnerData))
  return (
    <div className="container-fluid">
      <Col xl={12}>
        <Card>
          <Form
            autoComplete="off"
            className="needs-formik p-2"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              return false;
            }}
          >
            <div className="d-flex flex-column gap-3">
              <Row>
                <Row>
                  <Col md={4}>
                    <div>
                      <Form.Label
                        htmlFor="subCategoryId"
                        className="form-label"
                      >
                        Order Status
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="orderstatus"
                        id="orderstatus"
                        className="form-control"
                        type="text"
                        onChange={(e: any) =>
                          formik.setFieldValue("orderstatus", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.unit && formik.errors.unit
                            ? true
                            : false
                        }
                        required
                      >
                        <option value="">Select Order Status Here</option>
                        {status.map((item: any, index: number) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}

                      </Form.Control>
                      {formik.touched.unit && formik.errors.unit ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.unit}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div>
                      <Form.Label
                        htmlFor="subCategoryId"
                        className="form-label"
                      >
                        Select Partner
                      </Form.Label>
                      <Form.Control
                          as="select"
                          name="partner"
                          id="partner"
                          className="form-control"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.unit && formik.errors.unit ? true : false}
                          required
                        >
                          <option value="">Select Partner</option>
                          {partnerData.map((item: any) => {
                            console.log("item.name"+item.name)
                            return (
                              <option key={item.id} value={JSON.stringify(item)}>
                                {item.name}
                              </option>
                            );
                          })}
                        </Form.Control>

                      {formik.touched.unit && formik.errors.unit ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.unit}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <h3 className="mt-5">Order Information</h3>

                <Row>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryName"
                      className="form-label"
                    >
                      Order No
                    </Form.Label>
                    <Col>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter Name"
                        type="text"
                        value={selectedorder.order_no}
                        readOnly
                      />
                    </Col>
                  </Col>

                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      Order Status
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      value={`${selectedorder.status}`}
                      readOnly
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      Ordered On
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      value={moment(selectedorder.createdAt).format(
                        "MMM Do YY"
                      )}
                      readOnly
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      Payment Mode:
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      value={selectedorder.paymentOption}
                      readOnly
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      {selectedorder.recharge_request == 0
                        ? "Payment Amount"
                        : "Recharge Payment Amount"}
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      value={
                        selectedorder.paymentOption === "payViaCash"
                          ? selectedorder.recharge_request == 0
                            ? selectedorder.recharge_amount_via_cash
                            : selectedorder.recharge_request
                          : selectedorder.amount
                      }
                      readOnly
                    />
                  </Col>
                  {selectedorder.paymentOption === "payViaCash" && (
                    <Col md={4}>
                      <Form.Label
                        htmlFor="paymentAmount"
                        className="form-label"
                      >
                        {selectedorder.paymentOption !== 0 && "Payment Amount"}
                      </Form.Label>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter Name"
                        type="text"
                        value={cartTotal()}
                        readOnly
                      />
                    </Col>
                  )}
                </Row>

                <h3 className="mt-5">Product Information</h3>
                {selectedorder.product.map((item: any) => {
                  return (
                    <Row key={item.id}> {/* Ensure item.id is unique for each item */}
                      <Col md={4}>
                        <Form.Label htmlFor="subCategoryName" className="form-label">
                          Product name
                        </Form.Label>
                        <Row>
                          <Col md={2}>
                            <img
                              src={`${imagebaseURL}${item?.image[0]?.filename}`}
                              width="32"
                              height={50}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </Col>

                          <Col>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter Name"
                              type="text"
                              value={item.name}
                              isInvalid={
                                formik.touched.subCategoryName && formik.errors.subCategoryName
                                  ? true
                                  : false
                              }
                              readOnly
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md={4}>
                        <Form.Label htmlFor="subCategoryDescription" className="form-label">
                          Product Unit
                        </Form.Label>
                        <Form.Control
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          value={`${item.unitValue} ${item.unit}`}
                          readOnly
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label htmlFor="subCategoryDescription" className="form-label">
                          Product Price
                        </Form.Label>
                        <Form.Control
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          value={item.price}
                          readOnly
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label htmlFor="subCategoryDescription" className="form-label">
                          Product subscription type
                        </Form.Label>
                        <Form.Control
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          value={item.subscription_type}
                          readOnly
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label htmlFor="subCategoryDescription" className="form-label">
                          Product ordered quantity
                        </Form.Label>
                        <Form.Control
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          value={`Quantity ${item.selQty}`}
                          readOnly
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label htmlFor="subCategoryDescription" className="form-label">
                          Product Start Date
                        </Form.Label>
                        <Form.Control
                          className="form-control"
                          placeholder="Enter Delivery Date"
                          type="date"
                          onChange={(e:any)=>setStartDate(e.target.value)}
                          value={StartDate}
                        />
                      </Col>
                      <Col md={2} className="mt-4">
                        <Button
                          variant="secondary"
                          type="submit"
                          id="addNewContact"
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  );
                })}

                <h3 className="mt-5">Shipping Information</h3>
                <Row>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryName"
                      className="form-label"
                    >
                      Shipping Full Address
                    </Form.Label>
                    <Col>
                      <span className="form-control">
                        {selectedorder.shippingaddress.location}
                      </span>
                    </Col>
                  </Col>

                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      House number / Flat Number
                    </Form.Label>

                    <span className="form-control">
                      {selectedorder.shippingaddress.street}
                    </span>
                  </Col>

                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      Society / Colony name
                    </Form.Label>

                    <span className="form-control">
                      {selectedorder.shippingaddress.address}
                    </span>
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      Landmark
                    </Form.Label>
                    <span className="form-control">
                      {selectedorder.shippingaddress.landmark}
                    </span>
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      Alternative Contact Number
                    </Form.Label>
                    <span className="form-control">
                      {selectedorder.shippingaddress.alternatephone}
                    </span>
                  </Col>
                </Row>
                <h3 className="mt-5">User Information</h3>
                <Row>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryName"
                      className="form-label"
                    >
                      User name
                    </Form.Label>
                    <Col>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter Name"
                        type="text"
                        value={selectedorder.user.name}
                        readOnly
                      />
                    </Col>
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      User Email
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      value={`${selectedorder.user.email}`}
                      readOnly
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      htmlFor="subCategoryDescription"
                      className="form-label"
                    >
                      User Contact
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      value={selectedorder.user.contact}
                      readOnly
                    />
                  </Col>
                </Row>
              </Row>
            </div>
          </Form>
        </Card>
      </Col>
      {/* this is the sub category section */}
    </div>
  );
};

export default UpdateStatus;
