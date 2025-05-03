import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { FormikProvider, useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, FormFloating, Row } from "react-bootstrap";
import { PostProduct } from "Components/slices/product/thunk";
import {
  GetAllCategory,
  GetAllSubCategoryById,
} from "Components/slices/category/thunk";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseURL } from "Components/helpers/url_helper";
import { useDropzone } from "react-dropzone";
import { FormControlLabel, Stack, Switch } from "@mui/material";
import { GetAllLocation } from "Components/slices/location/thunk";
import Select_Comp from "@common/Select_comp";
import { AddnewContent } from "Components/slices/content/thunk";
import { CreateNewOffer } from "Components/slices/offer/thunk";
const units = ["kg", "gm", "ltr", "ml"];
const subscription_types = ["Daily", "Weekly", "One-time", "Alternatively"];

const OfferForm = () => {
  const dispatch: any = useDispatch();
  const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  const { category, subcat, locationData } = useSelector((state: any) => ({
    category: state.CategorySlice.categorydata,
    subcat: state.CategorySlice.subcat,
    locationData: state.location.locationData,
  }));
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      description: "",
      coupon: "",
      validity: "",
      type: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter content title name."),
      description: Yup.string().required("Please enter content."),
      coupon: Yup.string().required("Please enter content."),
      validity: Yup.string().required("Please enter content."),
      type: Yup.string().required("Please enter content."),
    }),
    onSubmit: (values) => {
      dispatch(CreateNewOffer(values));
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetAllCategory());
  }, []);

  useEffect(() => {
    dispatch(GetAllLocation());
  }, []);

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
                  <div>
                    <Form.Label htmlFor="name" className="form-label">
                      Offer Title
                    </Form.Label>
                    <Form.Control
                      name="title"
                      id="title"
                      className="form-control"
                      placeholder="Enter Title..."
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
                      Offer description
                    </Form.Label>
                    <Form.Control
                      name="description"
                      id="description"
                      className="form-control"
                      placeholder="Enter description..."
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
                <Col>
                  <div>
                    <Form.Label htmlFor="name" className="form-label">
                      Offer Validity
                    </Form.Label>
                    <Form.Control
                      name="validity"
                      id="validity"
                      className="form-control"
                      placeholder="Enter validity..."
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.validity}
                      isInvalid={
                        formik.touched.validity && formik.errors.validity
                          ? true
                          : false
                      }
                      required
                    />
                    {formik.touched.validity && formik.errors.validity ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.validity}
                      </Form.Control.Feedback>
                    ) : null}
                  </div>
                </Col>
                <Col>
                  <div>
                    <Form.Label htmlFor="name" className="form-label">
                      Coupon Code
                    </Form.Label>
                    <Form.Control
                      name="coupon"
                      id="coupon"
                      className="form-control"
                      placeholder="Enter coupon..."
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.coupon}
                      isInvalid={
                        formik.touched.coupon && formik.errors.coupon
                          ? true
                          : false
                      }
                      required
                    />
                    {formik.touched.coupon && formik.errors.coupon ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.coupon}
                      </Form.Control.Feedback>
                    ) : null}
                  </div>
                </Col>

                <Col>
                  <div>
                    <Form.Label htmlFor="name" className="form-label">
                      Offer Type
                    </Form.Label>
                    <Form.Control
                      name="type"
                      id="type"
                      className="form-control"
                      placeholder="Enter type..."
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.type}
                      isInvalid={
                        formik.touched.type && formik.errors.type ? true : false
                      }
                      required
                    />
                    {formik.touched.type && formik.errors.type ? (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.type}
                      </Form.Control.Feedback>
                    ) : null}
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

export default OfferForm;
