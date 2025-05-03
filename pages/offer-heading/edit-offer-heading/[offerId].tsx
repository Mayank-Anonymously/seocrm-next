import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { GetAllOfferHeading, editOfferHeading } from "Components/slices/offer_heading/thunk";

const OfferHeadingForm = ({ offerId }: any) => {
  const dispatch: any = useDispatch();
  const offerheadings = useSelector((state:any)=>state.offerheadings.offerHeadingdata);
  const offerheading = offerheadings.find((item: any) => item._id === offerId);
  console.log(offerheading, "offerheading");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: offerheading?.description,
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values: any) => {
      dispatch(editOfferHeading(offerId, values));
    },
  });

  useEffect(() => {
    dispatch(GetAllOfferHeading());
  },[])

  return (
    <div className="container-fluid">
      <Card>
        <Form
          autoComplete="off"
          className="needs-formik p-2"
          noValidate
          onSubmit={formik.handleSubmit}
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
                  isInvalid={
                    formik.touched.description && !!formik.errors.description
                  }
                  required
                />
                {formik.touched.description && formik.errors.description && (
                  <Form.Control.Feedback type="invalid">
                    {String(formik.errors.description)}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Row>
            <Button variant="secondary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export const getServerSideProps = (context: any) => {
  const { offerId } = context.query;
  return { props: { offerId } };
};

export default OfferHeadingForm;
