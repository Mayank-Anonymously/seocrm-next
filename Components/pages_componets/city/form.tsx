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
import { AddNewCity } from "Components/slices/city/thunk";

const CityForm = () => {
  const dispatch: any = useDispatch();

  const { locationData } = useSelector((state: any) => ({
    locationData: state.location.locationData,
  }));

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      cityName: "",
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required("Please enter city name."),
    }),
    onSubmit: (values) => {
      dispatch(AddNewCity(values));
      formik.resetForm();
    },
  });
  const handleSetSubImage = (inputdata: any) => {
    console.log(inputdata);
    formik.setFieldValue("subCategoryImage", inputdata.target.files[0]);
  };

  //   useEffect(() => {
  //     dispatch(Get());
  //   }, []);
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
                  name="cityName"
                  id="cityName"
                  className="form-control"
                  placeholder="Enter City Name"
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
                />
                {formik.touched.cityName && formik.errors.cityName ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.cityName}
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

export default CityForm;
