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
import { Card, Col } from "react-bootstrap";
import { GetAllLocation } from "Components/slices/location/thunk";
import { AddNewHub } from "Components/slices/hub/thunk";
import { GetAllCity } from "Components/slices/city/thunk";

const HubForm = () => {
  const dispatch: any = useDispatch();

  const { city } = useSelector((state: any) => ({
    city: state.city.cityData,
  }));

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      cityName: "",
      hubName: "",
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required("Please enter  city name."),
      hubName: Yup.string().required("Please enter Hub Name."),
    }),
    onSubmit: (values) => {
      dispatch(AddNewHub(values));
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetAllCity());
  }, []);
  console.log("fomik.values", formik.values);
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
              <div>
                <Form.Label htmlFor="categoryId" className="form-label">
                  Enter City Name
                </Form.Label>
                <Form.Control
                  as="select"
                  name="cityName"
                  id="cityName"
                  className="form-control"
                  type="cityName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cityName}
                  isInvalid={
                    formik.touched.cityName && formik.errors.cityName
                      ? true
                      : false
                  }
                  required
                >
                  <option selected value="">
                    Select City
                  </option>
                  {city.map((item: any) => {
                    return <option value={item._id}>{item.cityName}</option>;
                  })}
                </Form.Control>
                {formik.touched.cityName && formik.errors.cityName ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.cityName}
                  </Form.Control.Feedback>
                ) : null}
              </div>

              <div>
                <Form.Label htmlFor="categoryId" className="form-label">
                  Select Hub
                </Form.Label>
                <Form.Control
                  name="hubName"
                  id="hubName"
                  className="form-control"
                  placeholder="Enter Hub Name"
                  type="hubName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hubName}
                  isInvalid={
                    formik.touched.hubName && formik.errors.hubName
                      ? true
                      : false
                  }
                  required
                />
                {formik.touched.hubName && formik.errors.hubName ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.hubName}
                  </Form.Control.Feedback>
                ) : null}
              </div>

              <div className="text-end">
                <Button variant="secondary" type="submit" id="addNewContact">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </Col>
      {/* this is the sub category section */}
    </div>
  );
};

export default HubForm;
