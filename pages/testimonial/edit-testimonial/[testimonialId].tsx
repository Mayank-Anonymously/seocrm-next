import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { editTestimonial } from "Components/slices/testimonial/thunk";

const TestimonialForm = ({ testimonialId }: any) => {
  const dispatch: any = useDispatch();
  const selectedTestimonial = useSelector((state: any) => state.testimonial.selectedTestimonial);


  const formik: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      title:selectedTestimonial.title,
      description:selectedTestimonial.description,
      image:""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required")
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(editTestimonial(testimonialId, values));
      // formik.resetForm();
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
                      <Form.Label htmlFor="title" className="form-label">
                        Title
                      </Form.Label>
                      <Form.Control
                        name="title"
                        id="title"
                        className="form-control"
                        placeholder="Enter Title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        isInvalid={
                          formik.touched.title && formik.errors.title
                            ? true
                            : false
                        }
                        required
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.title}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
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
                      />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Form.Label htmlFor="description" className="form-label">
                        Description
                      </Form.Label>
                      <Form.Control
                        name="description"
                        id="description"
                        className="form-control"
                        placeholder="Enter Description"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        isInvalid={
                          formik.touched.description && formik.errors.description
                            ? true
                            : false
                        }
                        required
                      />
                      {formik.touched.description && formik.errors.description ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.description}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
                </Col>
              </Row>
              <Button variant="secondary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};
export const getServerSideProps = (context: any) => {
  const { testimonialId } = context.query;

  return { props: { testimonialId } };
};
export default TestimonialForm;
