import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Uploadslider } from "Components/slices/slider/thunk";

const SliderForm = () => {
  const dispatch: any = useDispatch();
  const formik: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      image:""
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(Uploadslider(values));
      formik.resetForm();
    },
  });

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
              <Row>
                <Col>
                  <Col>
                    <div>
                      <Form.Label htmlFor="name" className="form-label">
                        Image
                      </Form.Label>
                      <Form.Control
                        name="image"
                        id="image"
                        className="form-control"
                        placeholder="Select Image"
                        type="file"
                        onChange={(e: any) =>
                          formik.setFieldValue("image", e.target.files[0])
                        }
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.image && formik.errors.image
                            ? true
                            : false
                        }
                        required
                      />
                      {formik.touched.image && formik.errors.image ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.image}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
                  <h5>Selected Image:</h5>
                    <div className="d-flex flex-wrap">
                        {formik.values.image &&
                            <img
                            src={URL.createObjectURL(formik.values.image)}
                            alt={"Selected Image"}
                            className="img-thumbnail m-2"
                            width="100px"
                            />
                        }
                    </div>
                </Col>
              </Row>
              <Button variant="secondary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SliderForm;
