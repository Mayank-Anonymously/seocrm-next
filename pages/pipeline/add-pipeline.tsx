import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Breadcrumb from "@common/Breadcrumb";
import FormLabel from "@common/FormLabel";
import FormInput from "@common/FormInput";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useFormik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { AddNewVMS } from "Components/slices/vms/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { AddNewPipeline, fetchDegree } from "Components/slices/pipeline/thunk";

const AddPipeline = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { degree } = useSelector((state: any) => state.pipelineFeed);

  let userID: any;
  if (typeof window !== "undefined" && localStorage.getItem("id")) {
    userID = JSON.parse(localStorage.getItem("id") || "");
  }
  const today = new Date();
  today.setDate(today.getDate() + 1); // Set to the next day
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const minDate = `${yyyy}-${mm}-${dd}`;
  const formik: any = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      experience: "0",
      shift: "",
      hours: "0",
      availability: "",
      pay: "0",
      remarks: "",
      degree: "",
      speciality: "",
      userID: userID,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      // lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().required("Email is required"),
      phone: Yup.string()
        .matches(/^\d+$/, "Please enter only numbers")
        .required("Contact-Number is required")
        .min(10, "Contact Number should not be long less than 10 digits")
        .max(10, "Contact Number should not be long more than 10 digits"),
      // city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      // experience: Yup.string().required("Experience is required"),
      // shift: Yup.string().required("Shift Timing is required"),
      // hours: Yup.string().required("Working Hours is required"),
      // availability: Yup.string().required("Availability Date is required"),
      // pay: Yup.string().required("Desired Pay is required"),
      degree: Yup.string().required("Degree is required"),
      speciality: Yup.string().required("Speciality is required"),
      // remarks: Yup.string().required("Remarks is required"),
    }),

    onSubmit: (values: any) => {
      values.userID = userID;
      // values.totalExp = JSON.parse(values.experience);
      // values.preferredHours = JSON.parse(values.hours);
      // values.desiredPay = JSON.parse(values.pay);
      // formik.resetForm();
      dispatch(AddNewPipeline(values, router));
    },
  });
  console.log(formik.values);

  useEffect(() => {
    dispatch(fetchDegree());
  }, []);

  const DEGREE = degree?.degree?.map((item: any) => {
    return item;
  });

  const SPECIALITY = degree?.specialty?.map((item: any) => {
    return item;
  });

  const STATES = degree?.states?.map((item: any) => {
    return item;
  });

  return (
    <React.Fragment>
      <Head>
        <title>Add Pipeline | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Breadcrumb breadcrumb="Dashboard" breadcrumbItem="Add Pipeline" />
        <Container fluid={true}>
          <Tooltip title="Upload Excel">
            <Link href="upload-pipeline">
              <IconButton color="secondary">
                <CloudUploadIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-n1">
              <Col lg={4} xs={4}>
                <FormLabel for="firstName" labelname="First Name" />
                <FormInput
                  inpType="text"
                  inpchange={formik.handleChange}
                  inpId="firstName"
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.firstName}
                  inpPlaceholder="Enter First Name"
                />
                <span className="text-danger">
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-danger">{formik.errors.firstName}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="lastName" labelname="Last Name" />
                <FormInput
                  inpType="text"
                  inpchange={formik.handleChange}
                  inpId="lastName"
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.lastName}
                  inpPlaceholder="Enter Last Name"
                />
                <span className="text-danger">
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-danger">{formik.errors.lastName}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={4} xs={4}>
                <FormLabel for="email" labelname="Email" />
                <FormInput
                  inpType="email"
                  inpId="email"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.email}
                  inpPlaceholder="Enter email Address"
                />
                <span className="text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="phone" labelname="Phone No." />
                <FormInput
                  inpType="text"
                  inpId="phone"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.phone}
                  inpPlaceholder="Enter Phone Number"
                />
                <span className="text-danger">
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="city" labelname="City" />
                <FormInput
                  inpType="text"
                  inpId="city"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.city}
                  inpPlaceholder="Enter City "
                />
                <span className="text-danger">
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-danger">{formik.errors.city}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="state" labelname="State" />
                <Autocomplete
                  disablePortal
                  options={STATES}
                  onSelect={(option: any) =>
                    formik.setFieldValue("state", option.target.value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="States" />
                  )}
                />
                <span className="text-danger">
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-danger">{formik.errors.state}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="availability" labelname="Availability" />
                <FormInput
                  inpType="date"
                  inpId="availability"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.availability}
                  inpPlaceholder="Select availability"
                  max="2999-12-31"
                  min={minDate}
                />
                <span className="text-danger">
                  {formik.touched.availability && formik.errors.availability ? (
                    <div className="text-danger">
                      {formik.errors.availability}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="hours" labelname="Preferred Hours" />
                <FormInput
                  inpType="text"
                  inpId="hours"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.hours}
                  inpPlaceholder="Select Preferred Hours"
                />
                <span className="text-danger">
                  {formik.touched.hours && formik.errors.hours ? (
                    <div className="text-danger">{formik.errors.hours}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={4} xs={4}>
                <FormLabel for="pay" labelname="Desired Pay" />
                <FormInput
                  inpType="number"
                  inpId="pay"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.pay}
                  inpPlaceholder="Select Desired Pay"
                />
                <span className="text-danger">
                  {formik.touched.pay && formik.errors.pay ? (
                    <div className="text-danger">{formik.errors.pay}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="shift" labelname="Shift Timing" />
                <FormInput
                  inpType="text"
                  inpId="shift"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.shift}
                  inpPlaceholder="Enter shift timing"
                />
                <span className="text-danger">
                  {formik.touched.shift && formik.errors.shift ? (
                    <div className="text-danger">{formik.errors.shift}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="experience" labelname="Total Experience" />
                <FormInput
                  inpType="text"
                  inpId="experience"
                  inpchange={formik.handleChange}
                  inpblur={formik.handleBlur}
                  inpvalue={formik.values.experience}
                  inpPlaceholder="Enter Experience in Years"
                />
                <span className="text-danger">
                  {formik.touched.experience && formik.errors.experience ? (
                    <div className="text-danger">
                      {formik.errors.experience}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="degree" labelname="Profession" />
                <Autocomplete
                  disablePortal
                  options={DEGREE}
                  onSelect={(option: any) =>
                    formik.setFieldValue("degree", option.target.value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Profession" />
                  )}
                />
                <span className="text-danger">
                  {formik.touched.degree && formik.errors.degree ? (
                    <div className="text-danger">{formik.errors.degree}</div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={3} xs={3}>
                <FormLabel for="speciality" labelname="Speciality" />
                <Autocomplete
                  disablePortal
                  options={SPECIALITY}
                  onSelect={(option: any) =>
                    formik.setFieldValue("speciality", option.target.value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Speciality" />
                  )}
                />
                <span className="text-danger">
                  {formik.touched.speciality && formik.errors.speciality ? (
                    <div className="text-danger">
                      {formik.errors.speciality}
                    </div>
                  ) : null}
                </span>
              </Col>

              <Col className="mt-3" lg={6} xs={6}>
                <FormLabel for="Remarks" labelname="Remarks" />
                <textarea
                  className="form-control"
                  id="remarks"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remarks}
                ></textarea>
                <span className="text-danger">
                  {formik.touched.remarks && formik.errors.remarks ? (
                    <div className="text-danger">{formik.errors.remarks}</div>
                  ) : null}
                </span>
              </Col>

              <Col lg={12} className="mb-3 mt-2">
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddPipeline.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddPipeline;
