import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Card, Col } from "react-bootstrap";
import {
    GET_SUBCATEGORY_BY_ID,
    UPDATE_SUBCATEGORY_BY_ID,
    baseURL
} from "../../../Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
interface SubCategory {
    subCategoryImage?: string;
    subCategoryName?: string;
    subCategoryDescription?: string;
}

const updateForm = ({subcategoryId}: any) => {
  const [subcategory, setSubCategory] = useState<SubCategory>({});
  const getSubCategoryData = async()=>{
    try{
        const options = {
        url: `${baseURL}${GET_SUBCATEGORY_BY_ID}${subcategoryId}`,
        method: "GET",
        };
        const fetchapi = await axios.request(options);
        const resp: any = await fetchapi;
        const { response, baseResponse } = resp;
        setSubCategory(response);
    }catch(error){
        console.log("something went wrong");
    }
  }
  useEffect(()=>{
    getSubCategoryData();
  },[])
  const handleSubmit = async(values: any) => {
    try {
      const form = new FormData();
      form.append("subCategoryName", values.subCategoryName);
      form.append("subCategoryImage", values.subCategoryImage);
      form.append("subCategoryDescription", values.subCategoryDescription);
  
      const options = {
        method: "POST",
        url: `${baseURL}${UPDATE_SUBCATEGORY_BY_ID}${subcategoryId}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: form,
      };
      const apifetch:any = await axios.request(options);
      const response: any = apifetch.baseResponse;
      if (response.status === 1) {
        Swal.fire({
          title: "Good job!",
          text: response.message,
          icon: "success",
        })
      } else {
        Swal.fire({
          title: "error",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "error!",
        text: error,
        icon: "error",
      });
    }
  };
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      subCategoryImage: "",
      subCategoryName: subcategory.subCategoryName,
      subCategoryDescription: subcategory.subCategoryDescription,
    },
    validationSchema: Yup.object({
      subCategoryName: Yup.string().required("Please enter a  category name."),
      subCategoryDescription: Yup.string().required(
        "Please enter an description."
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSetSubImage = (inputdata: any) => {
    formik.setFieldValue("subCategoryImage", inputdata.target.files[0]);
  };
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
                  Update
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

export default updateForm;
