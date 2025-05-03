import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import Link from "next/link";
import Breadcrumb from "@common/Breadcrumb";
import Head from "next/head";
import Image from "next/image";
import Layout from "@common/Layout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  UploadNewPipeline,
  fetchSampleCSV,
} from "Components/slices/pipeline/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const AddPipeline = () => {
  const [selectedFiles, setselectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [isFilesPresent, setIsFilesPresent] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();

  let userID: any;
  if (typeof window !== "undefined" && localStorage.getItem("id")) {
    userID = JSON.parse(localStorage.getItem("id") || "");
  }
  function handleAcceptedFiles(files: any) {
    // Filter out only files with the .xlsx extension
    const xlsxFiles = files.filter((file: any) => file.name.endsWith(".xlsx"));

    // Process the filtered files
    const updatedFiles = xlsxFiles.map((file: any) =>
      Object.assign(file, {
        formattedSize: formatBytes(file.size),
      })
    );

    // Update state with the filtered and processed files
    setselectedFiles(updatedFiles);
    setFiles(updatedFiles);
    setIsFilesPresent(true);
  }

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const handleApiRequest = async () => {
    const filesToUpload = files;
    dispatch(UploadNewPipeline(filesToUpload, router, userID));
  };
  const sampleDownload = async () => {
    dispatch(fetchSampleCSV());
  };
  

  return (
    <React.Fragment>
      <Head>
        <title>Add Pipeline | Midas - HRMS</title>
      </Head>

      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Dashboard" breadcrumbItem="Upload Pipeline" />

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header
                  className="align-items-center d-flex justify-content-end"
                  style={{ gap: "20px" }}
                >
                  <Tooltip title="Add Manually">
                    <Link href="add-pipeline">
                      <IconButton color="primary">
                        <AddCircleIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>

                  <Tooltip title="Download Sample CSV File">
                    <Button
                      variant="secondary"
                      type="submit"
                      onClick={sampleDownload}
                    >
                      <i
                        style={{ fontSize: "16px" }}
                        className="bi bi-cloud-arrow-down-fill"
                      ></i>
                    </Button>
                  </Tooltip>
                </Card.Header>
                <Card.Body>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone dz-clickable text-center">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                          </div>
                          <input {...getInputProps()} />
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="list-unstyled mb-0" id="file-previews">
                    {selectedFiles.map((f: any, i: number) => {
                      return (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                {/* <Image
                                  data-dz-thumbnail=""
                                  height="80"
                                  width="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                /> */}
                              </Col>
                              <Col>
                                <Link
                                  href="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                  <Button
                    className="mt-3"
                    variant="primary"
                    type="submit"
                    onClick={handleApiRequest}
                    disabled={!isFilesPresent}
                  >
                    Submit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

AddPipeline.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddPipeline;
