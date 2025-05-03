import React, { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { PostCategory } from "Components/slices/category/thunk";
import { Card, Col } from "react-bootstrap";

const ReactForm = () => {
  const dispatch: any = useDispatch();
  const [active, setActive] = useState<boolean>(false);
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      images: "",
      categoryName: "",
      categoryDescription: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Please enter a  category name."),
      categoryDescription: Yup.string().required(
        "Please enter an description."
      ),
      // country: Yup.string().required("Please select a country."),
      // label: Yup.string().required("Please select a label."),
    }),
    onSubmit: (values) => {
      dispatch(PostCategory(values));
      formik.resetForm();
    },
  });
  const handleSetImage = (inputdata: any) => {
    formik.setFieldValue("images", inputdata.target.files[0]);
  };

  return (
    <div className="container-fluid">
      <Col xl={12}>
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
            <div className="d-flex flex-column gap-3 m-3">
              <div className="position-relative d-inline-block">
                <div className="">
                  <Form.Label htmlFor="contact-image-input" className="mb-0">
                    <div className="avatar-xs">
                      <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                        <i className="ri-image-fill"></i>
                      </div>
                    </div>
                  </Form.Label>
                  Select Category Image
                  <Form.Control
                    className="form-control d-none"
                    id="contact-image-input"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    isInvalid={
                      formik.touched.img && formik.errors.img ? true : false
                    }
                    onChange={(e) => {
                      handleSetImage(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
                <Form.Label htmlFor="name" className="form-label">
                  Category name
                </Form.Label>
                <Form.Control
                  name="categoryName"
                  id="name"
                  className="form-control"
                  placeholder="Enter your name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryName}
                  isInvalid={
                    formik.touched.categoryName && formik.errors.categoryName
                      ? true
                      : false
                  }
                  required
                />
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.categoryName}
                  </Form.Control.Feedback>
                ) : null}
              </div>

              <div>
                <Form.Label htmlFor="email" className="form-label">
                  Category Description
                </Form.Label>
                <Form.Control
                  name="categoryDescription"
                  id="email"
                  className="form-control"
                  placeholder="Enter Description"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryDescription}
                  isInvalid={
                    formik.touched.categoryDescription &&
                    formik.errors.categoryDescription
                      ? true
                      : false
                  }
                  required
                />
                {formik.touched.categoryDescription &&
                formik.errors.categoryDescription ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.categoryDescription}
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

export default ReactForm;
