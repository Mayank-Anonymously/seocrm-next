import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Card, Col } from "react-bootstrap";
import { CreateMembership } from "Components/slices/membership/thunk";

const CrmForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    // Fetch existing data and set it to formData for editing
    // Example:
    // const fetchData = async () => {
    //   const data = await fetchExistingData();
    //   setFormData(data);
    // };
    // fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // Dispatch action to save or update data
    // Example:
    // dispatch(CreateMembership(values));
    setSubmitting(false);
  };

  return (
    <div className="container-fluid">
      <Card>
        <Formik
          initialValues={formData}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            mobile: Yup.string().required("Mobile is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            role: Yup.string().required("Role is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form
              id="contactlist-form"
              autoComplete="off"
              className="needs-validation p-2"
              noValidate
            >
              <div className="d-flex flex-column gap-3">
                <Col>
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      name="name"
                      id="name"
                      className={`form-control ${
                        errors.name && touched.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Name"
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </Col>
                <Col>
                  <div>
                    <label htmlFor="mobile" className="form-label">
                      Mobile
                    </label>
                    <Field
                      name="mobile"
                      id="mobile"
                      className={`form-control ${
                        errors.mobile && touched.mobile ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Mobile"
                      onChange={handleChange}
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="invalid-feedback">{errors.mobile}</div>
                    )}
                  </div>
                </Col>
                <Col>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      name="email"
                      id="email"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Email"
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </Col>
                <Col>
                  <div>
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <Field
                      name="role"
                      id="role"
                      className={`form-control ${
                        errors.role && touched.role ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Role"
                      onChange={handleChange}
                    />
                    {errors.role && touched.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
                  </div>
                </Col>
                <Button variant="secondary" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default CrmForm;
