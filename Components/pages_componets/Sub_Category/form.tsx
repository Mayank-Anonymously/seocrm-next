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

const SubCatForm = () => {
  const dispatch: any = useDispatch();
  const { category } = useSelector((state: any) => ({
    category: state.CategorySlice.categorydata,
  }));
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      subCategoryImage: "",
      subCategoryName: "",
      subCategoryDescription: "",
    },
    validationSchema: Yup.object({
      subCategoryName: Yup.string().required("Please enter a  category name."),
      subCategoryDescription: Yup.string().required(
        "Please enter an description."
      ),
    }),
    onSubmit: (values) => {
      dispatch(PostSubCategory(values));
      formik.resetForm();
    },
  });
  const handleSetSubImage = (inputdata: any) => {
    console.log(inputdata);
    formik.setFieldValue("subCategoryImage", inputdata.target.files[0]);
  };
  useEffect(() => {
    dispatch(GetAllCategory());
  }, []);

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
            <div className="d-flex flex-column gap-3 m-3">
              <div className="position-relative d-inline-block">
                <div className="">
                  <Form.Label htmlFor="subCategoryImage" className="mb-0">
                    <div className="avatar-xs">
                      <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                        <i className="ri-image-fill"></i>
                      </div>
                    </div>
                  </Form.Label>
                  Select Category Image
                  <Form.Control
                    className="form-control d-none"
                    id="subCategoryImage"
                    name="subCategoryImage"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    isInvalid={
                      formik.touched.subCategoryImage &&
                      formik.errors.subCategoryImage
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      handleSetSubImage(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
                <Form.Label htmlFor="categoryId" className="form-label">
                  Category Name
                </Form.Label>
                <Form.Control
                  as="select"
                  name="categoryId"
                  id="categoryId"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryId}
                  isInvalid={
                    formik.touched.categoryId && formik.errors.categoryId
                      ? true
                      : false
                  }
                  required
                >
                  <option value="">Select this menu</option>
                  {category.map((item: any) => {
                    return (
                      <option value={item._id}>{item.categoryName}</option>
                    );
                  })}
                </Form.Control>
                {formik.touched.categoryId && formik.errors.categoryId ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.categoryId}
                  </Form.Control.Feedback>
                ) : null}
              </div>
              <div>
                <Form.Label htmlFor="subCategoryName" className="form-label">
                  Sub Category Name
                </Form.Label>
                <Form.Control
                  name="subCategoryName"
                  id="subCategoryName"
                  className="form-control"
                  placeholder="Enter Name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subCategoryName}
                  isInvalid={
                    formik.touched.subCategoryName &&
                    formik.errors.subCategoryName
                      ? true
                      : false
                  }
                  required
                />
                {formik.touched.subCategoryName &&
                formik.errors.subCategoryName ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.subCategoryName}
                  </Form.Control.Feedback>
                ) : null}
              </div>
              <div>
                <Form.Label
                  htmlFor="subCategoryDescription"
                  className="form-label"
                >
                  Sub Category Description
                </Form.Label>
                <Form.Control
                  name="subCategoryDescription"
                  id="subCategoryDescription"
                  className="form-control"
                  placeholder="Enter Description"
                  type="subCategoryDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subCategoryDescription}
                  isInvalid={
                    formik.touched.subCategoryDescription &&
                    formik.errors.subCategoryDescription
                      ? true
                      : false
                  }
                  required
                />
                {formik.touched.subCategoryDescription &&
                formik.errors.subCategoryDescription ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.subCategoryDescription}
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

export default SubCatForm;
