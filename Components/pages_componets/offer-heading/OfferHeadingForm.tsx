import React from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { createOfferHeading } from "Components/slices/offer_heading/thunk";

const OfferHeadingForm = () => {
  const dispatch: any = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      description: ""
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      dispatch(createOfferHeading(values));
      formik.resetForm();
    },
  });

  return (
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
                <Form.Label htmlFor="description" className="form-label">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Enter description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.description && !!formik.errors.description}
                  required
                />
                {formik.touched.description && formik.errors.description ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                ) : null}
              </Col>
            </Row>
            <Button variant="secondary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default OfferHeadingForm;
