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
const units = ["kg", "gm", "ltr", "ml"];
const subscription_types = ["Daily", "Weekly", "One-time", "Alternatively"];

const ContentForm = () => {
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
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter content title name."),
      content: Yup.string().required("Please enter content."),
    }),
    onSubmit: (values) => {
      dispatch(AddnewContent(values));
      formik.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetAllCategory());
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditor(true);
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
                      Title
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
              </Row>
              <Col>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    Content
                  </Form.Label>
                  {editor ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={formik.values.content}
                      onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();

                        formik.setFieldValue("content", data);
                      }}
                    />
                  ) : (
                    <p>ckeditor5</p>
                  )}
                  {formik.touched.content && formik.errors.content ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.content}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>

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

export default ContentForm;
