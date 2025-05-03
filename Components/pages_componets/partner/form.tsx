import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { FormikProvider, useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { PostProduct } from "Components/slices/product/thunk";
import {
  GetAllCategory,
  GetAllSubCategoryById,
} from "Components/slices/category/thunk";
import {
  Circle,
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { baseURL } from "Components/helpers/url_helper";
import { useDropzone } from "react-dropzone";
import { Addnewlocation } from "../../slices/location/thunk";
import { AddnewPartner } from "Components/slices/partner/thunk";
import { GetAllCity } from "Components/slices/city/thunk";
import { GetAllHubs } from "Components/slices/hub/thunk";
const units = ["kg", "gm", "ltr", "ml"];
const subscription_types = ["Daily", "Weekly", "One-time", "Alternatively"];

const PartnerForm = () => {
  const dispatch: any = useDispatch();
  const { hub, city } = useSelector((state: any) => ({
    hub: state.hub.hubData,
    city: state.city.cityData,
  }));
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      city: "",
      hub: "",
      name: "",
      contact: "",
      document: "",
      address: "",
      email: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Required"),
      hub: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      contact: Yup.string().required("Required"),
      document: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
    }),
    onSubmit: (values: any) => {
      dispatch(AddnewPartner(values));
    },
  });

  useEffect(() => {
    dispatch(GetAllCity());
    dispatch(GetAllHubs());
  }, []);
  console.log("city:", city);
  console.log("hub:", hub);
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
              formik.handleSubmit();
              return false;
            }}
          >
            <div className="d-flex flex-column gap-3">
              <Col>
                <div>
                  <Form.Label htmlFor="city" className="form-label">
                    City Name
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="city"
                    id="city"
                    className="form-control"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.city && formik.errors.city ? true : false
                    }
                    required
                  >
                    <option selected value="">
                      Select the city
                    </option>
                    {city.map((item: any) => {
                      return <option value={item._id}>{item.cityName}</option>;
                    })}
                  </Form.Control>
                  {formik.touched.city && formik.errors.city ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.city}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="hub" className="form-label">
                    Hub Name
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="hub"
                    id="hub"
                    className="form-control"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.hub && formik.errors.hub ? true : false
                    }
                    required
                  >
                    <option selected value="">
                      Select hub
                    </option>
                    {hub.map((item: any) => {
                      return <option value={item._id}>{item.hubName}</option>;
                    })}
                  </Form.Control>

                  {formik.touched.hub && formik.errors.hub ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.hub}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    Partner Name
                  </Form.Label>
                  <Form.Control
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter Partner name"
                    type="text"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="contact" className="form-label">
                    Contact
                  </Form.Label>
                  <Form.Control
                    name="contact"
                    id="contact"
                    className="form-control"
                    placeholder="Enter contact"
                    type="text"
                    value={formik.values.contact}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.contact && formik.errors.contact
                        ? true
                        : false
                    }
                    required
                  />
                  {formik.touched.contact && formik.errors.contact ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.contact}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="email" className="form-label">
                    Partner Email
                  </Form.Label>
                  <Form.Control
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    type="eamil-adddress"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="address" className="form-label">
                    Partner Address
                  </Form.Label>
                  <Form.Control
                    name="address"
                    id="address"
                    className="form-control"
                    placeholder="Enter address"
                    type="text"
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.address && formik.errors.address
                        ? true
                        : false
                    }
                    required
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.address}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="PartnerDocument" className="form-label">
                    Partner Document
                  </Form.Label>
                  <Form.Control
                    name="document"
                    id="document"
                    className="form-control"
                    placeholder="Enter Partner Document"
                    type="file"
                    onBlur={formik.handleBlur}
                    onChange={(e: any) =>
                      formik.setFieldValue("document", e.target.files)
                    }
                    isInvalid={
                      formik.touched.document && formik.errors.document
                        ? true
                        : false
                    }
                    required
                  />
                  {formik.touched.document && formik.errors.document ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.document}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
            </div>
          </Form>
        </Card>
      </div>

      <Col>
        <Row style={{ margin: 5 }}>
          <Button type="submit" onClick={(e) => formik.handleSubmit(e)}>
            Add Partner
          </Button>
        </Row>
      </Col>
    </>
  );
};

export default PartnerForm;
