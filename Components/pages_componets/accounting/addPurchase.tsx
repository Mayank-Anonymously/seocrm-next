import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  GET_ALL_VENDORS,
  baseURL,
  CREATE_PURCHASE
} from "../../../Components/helpers/url_helper";
import Swal from "sweetalert2";

const AddPurchase = () => {
  const [vendors,setVendors] = useState([]);
  const initialValues = {
    totalSale: "",
    totalAmount: "",
    totalRefund: "",
    offerBalance: "",
    addPurchase: "",
    addExpenses: "",
    vendor: "",
    productName: "",
    productQuantity: "",
    productPrice: "",
    billNo: "",
    billDate: "",
    sgst: "",
    cgst: "",
    igst: "",
    totalAmountWithoutTax: "",
    totalAmountWithTax: "",
  };

  const validationSchema = Yup.object().shape({
    totalSale: Yup.string().required("Total Sale is required"),
    totalAmount: Yup.string().required("Total Amount is required"),
    totalRefund: Yup.string().required("Total Refund is required"),
    offerBalance: Yup.string().required("Offer Balance is required"),
    addPurchase: Yup.string().required("Add Purchase is required"),
    addExpenses: Yup.string().required("Add Expenses is required"),
    vendor: Yup.string().required("Vendor is required"),
    productName: Yup.string().required("Product Name is required"),
    productQuantity: Yup.string().required("Product Quantity is required"),
    productPrice: Yup.string().required("Product Price is required"),
    billNo: Yup.string().required("Bill No is required"),
    billDate: Yup.string().required("Bill Date is required"),
    sgst: Yup.string().required("SGST is required"),
    cgst: Yup.string().required("CGST is required"),
    igst: Yup.string().required("IGST is required"),
    totalAmountWithoutTax: Yup.string().required("Total Amount Without Tax is required"),
    totalAmountWithTax: Yup.string().required("Total Amount With Tax is required"),
  });

  const handleSubmit = async(values:any,{ resetForm }: any) => {
    console.log(values);
    try {
      const options = {
        url: `${baseURL}${CREATE_PURCHASE}`,
        method: "POST",
        data: values
      };
      const fetchapi = await axios.request(options);
      const resp: any = await fetchapi;
      const { response, baseResponse } = resp;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        });
        resetForm(); 
      }else if (baseResponse.status === 0) {
        Swal.fire({
          title: "error",
          text: baseResponse.message,
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: error,
        text: error,
        icon: "error",
      });
    }
    // dispatch(CreateMembership(values)); // Uncomment this to dispatch the action
  };
  const getAllVendors = async()=>{
    const data:any = await axios(`${baseURL}${GET_ALL_VENDORS}`);
      const {baseResponse,response}:any = data;
      setVendors(response);
  }
  useEffect(()=>{
    getAllVendors();
  },[])

  return (
    <div className="container-fluid">
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, errors, touched }) => (
            <FormikForm id="contactlist-form" className="needs-formik p-2">
              <div className="d-flex flex-column gap-6">
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="totalSale">
                      <Form.Label>Total Sale</Form.Label>
                      <Field
                        type="number"
                        name="totalSale"
                        className="form-control"
                        placeholder="Enter Total Sale..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.totalSale && touched.totalSale ? (
                        <div className="text-danger">{errors.totalSale}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="totalAmount">
                      <Form.Label>Total Amount</Form.Label>
                      <Field
                        type="number"
                        name="totalAmount"
                        className="form-control"
                        placeholder="Enter Total Amount..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.totalAmount && touched.totalAmount ? (
                        <div className="text-danger">{errors.totalAmount}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="totalRefund">
                      <Form.Label>Total Refund</Form.Label>
                      <Field
                        type="number"
                        name="totalRefund"
                        className="form-control"
                        placeholder="Enter Total Refund..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.totalRefund && touched.totalRefund ? (
                        <div className="text-danger">{errors.totalRefund}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="offerBalance">
                      <Form.Label>Offer Balance</Form.Label>
                      <Field
                        type="number"
                        name="offerBalance"
                        className="form-control"
                        placeholder="Enter Offer Balance..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.offerBalance && touched.offerBalance ? (
                        <div className="text-danger">{errors.offerBalance}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="addPurchase">
                      <Form.Label>Add Purchase</Form.Label>
                      <Field
                        type="number"
                        name="addPurchase"
                        className="form-control"
                        placeholder="Enter Add Purchase..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.addPurchase && touched.addPurchase ? (
                        <div className="text-danger">{errors.addPurchase}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="addExpenses">
                      <Form.Label>Add Expenses</Form.Label>
                      <Field
                        type="number"
                        name="addExpenses"
                        className="form-control"
                        placeholder="Enter Add Expenses..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.addExpenses && touched.addExpenses ? (
                        <div className="text-danger">{errors.addExpenses}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="vendor">
                      <Form.Label>Select Vendor</Form.Label>
                      <Field
                        name="vendor"
                        as="select"
                        className="form-control"
                      >
                        <option value="" disabled>Select Vendor</option>
                        {vendors?.map((vendor:any) => (
                          <option key={vendor._id} value={vendor._id}>
                            {vendor.name}
                          </option>
                        ))}
                      </Field>
                      {errors.vendor && touched.vendor ? (
                        <div className="text-danger">{errors.vendor}</div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="productName">
                      <Form.Label>Enter Product Name</Form.Label>
                      <Field
                        name="productName"
                        className="form-control"
                        placeholder="Enter Product Name..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.productName && touched.productName ? (
                        <div className="text-danger">{errors.productName}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="productQuantity">
                      <Form.Label>Enter Product Quantity</Form.Label>
                      <Field
                        type="number"
                        name="productQuantity"
                        className="form-control"
                        placeholder="Enter Product Quantity..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.productQuantity && touched.productQuantity ? (
                        <div className="text-danger">{errors.productQuantity}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="productPrice">
                      <Form.Label>Enter Product Price</Form.Label>
                      <Field
                        type="number"
                        name="productPrice"
                        className="form-control"
                        placeholder="Enter Product Price..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.productPrice && touched.productPrice ? (
                        <div className="text-danger">{errors.productPrice}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="billNo">
                      <Form.Label>Bill No</Form.Label>
                      <Field
                        name="billNo"
                        className="form-control"
                        placeholder="Enter Bill No..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.billNo && touched.billNo ? (
                        <div className="text-danger">{errors.billNo}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="billDate">
                      <Form.Label>Bill Date</Form.Label>
                      <Field
                        type="date"
                        name="billDate"
                        className="form-control"
                        placeholder="Enter Bill Date..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.billDate && touched.billDate ? (
                        <div className="text-danger">{errors.billDate}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="sgst">
                      <Form.Label>SGST</Form.Label>
                      <Field
                        type="number"
                        name="sgst"
                        className="form-control"
                        placeholder="Enter SGST..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.sgst && touched.sgst ? (
                        <div className="text-danger">{errors.sgst}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="cgst">
                      <Form.Label>CGST</Form.Label>
                      <Field
                        type="number"
                        name="cgst"
                        className="form-control"
                        placeholder="Enter CGST..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.cgst && touched.cgst ? (
                        <div className="text-danger">{errors.cgst}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="igst">
                      <Form.Label>IGST</Form.Label>
                      <Field
                        type="number"
                        name="igst"
                        className="form-control"
                        placeholder="Enter IGST..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.igst && touched.igst ? (
                        <div className="text-danger">{errors.igst}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="totalAmountWithoutTax">
                      <Form.Label>Total Amount Without Tax</Form.Label>
                      <Field
                        type="number"
                        name="totalAmountWithoutTax"
                        className="form-control"
                        placeholder="Enter Total Amount Without Tax..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.totalAmountWithoutTax && touched.totalAmountWithoutTax ? (
                        <div className="text-danger">{errors.totalAmountWithoutTax}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="totalAmountWithTax">
                      <Form.Label>Total Amount With Tax</Form.Label>
                      <Field
                        type="number"
                        name="totalAmountWithTax"
                        className="form-control"
                        placeholder="Enter Total Amount With Tax..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.totalAmountWithTax && touched.totalAmountWithTax ? (
                        <div className="text-danger">{errors.totalAmountWithTax}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="secondary" type="submit">
                  Save
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddPurchase;
