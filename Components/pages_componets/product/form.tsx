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
const units = ["kg", "gm", "ltr", "ml"];
const subscription_types = ["Daily", "Weekly", "One-time", "Alternatively"];

const ProductForm = () => {
  const dispatch: any = useDispatch();
  const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
  };

  const apiKey: string = "AIzaSyA76OKDCbizM99zuhLvExdBx666iLNEAm0"; // Replace with your API key
  const defaultCenter: google.maps.LatLngLiteral = {
    lat: 28.6031121,
    lng: 77.3668853,
  }; // Default center for India
  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(defaultCenter);
  const [localityBoundary, setLocalityBoundary] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const [countryBoundary, setCountryBoundary] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [circleRadius, setCircleRadius] = useState<number>(5000); // 20 km in meters
  const [inValue, setInpValue] = useState<string>("");
  const [placeName, setPlaceName] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [locationArray, setLocationsArray] = useState<any>([]);
  const [selectedLocationArray, setSelectedLocationArray] = useState<any>([]);

  const [marker, setMarker] = useState<string>("");
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [locations, setLocations] = React.useState<string[]>([]);
  const [active, setActive] = useState(false);
  const { category, subcat, locationData } = useSelector((state: any) => ({
    category: state.CategorySlice.categorydata,
    subcat: state.CategorySlice.subcat,
    locationData: state.location.locationData,
  }));
  console.log("locationArray:", locationArray);
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      images: [],
      name: "",
      description: "",
      status: true,
      categoryId: "",
      subCategoryId: "",
      regularPrice: "",
      price: "",
      unit: "",
      unit_value: "",
      location: [],
      subscription_type: [],
      subscription_active: false,
      product_type: "",
      membership_offer: "",
      iconImage: "",
      shortdescription: "",
      sgst:"",
      cgst:"",
      igst:""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter a  category name."),
      description: Yup.string().required("Please enter an description."),
      shortdescription: Yup.string().required(
        "Please enter an short description."
      ),
      categoryId: Yup.string().required("Required"),
      subCategoryId: Yup.string().required("Required"),
      regularPrice: Yup.number().required("Required"),
      price: Yup.number().required("Required"),
      unit: Yup.string().required("Required"),
      unit_value: Yup.number().required("Required"),
      location: Yup.array().required("Required"),
      subscription_type: Yup.array().required("Required"),
      iconImage: Yup.string().required("Required"),
      sgst: Yup.string().required("Required"),
      cgst: Yup.string().required("Required"),
      igst: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(PostProduct(values));
      // formik.resetForm();
    },
  });

  console.log(formik.values);
  useEffect(() => {
    dispatch(GetAllCategory());
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditor(true);
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    const images = [...formik.values.images, ...acceptedFiles];
    formik.setFieldValue("images", images);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    var type: any = [];

    type.push(typeof value === "string" ? value.split(",") : value);

    formik.setFieldValue("subscription_type", type);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    dispatch(GetAllLocation());
  }, []);

  const handleChangeSelectedocation = (e: any) => {
    e.preventDefault();
    const value = JSON.parse(e.target.value);
    var locationName = value.locatioName;
    var type: any = [];
    // setSelectedLocationArray();
    setLocationsArray((prevData: any) => [...prevData, value.locationName]);
    type.push(value.locationName);

    formik.setFieldValue("location", [
      ...formik.values.location,
      value.location,
    ]);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex flex-column gap-3 m-3">
          <div className="position-relative d-inline-block">
            <div className="dropzone text-center " {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                {isDragActive
                  ? "Drop the files here ..."
                  : "Drag 'n' drop some files here, or click to select files"}
              </p>
            </div>
            Select Product Images
          </div>
        </div>
        {formik.values.images && formik.values.images.length > 0 && (
          <div
            className="mt-2"
            style={{ maxHeight: "100px", overflow: "auto" }}
          >
            <h5>Selected Images:</h5>
            <div className="d-flex flex-wrap">
              {formik.values.images.map((image: any, index: any) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Selected Image ${index + 1}`}
                  className="img-thumbnail m-2"
                  width="100px"
                />
              ))}
            </div>
          </div>
        )}
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
                      <Form.Label htmlFor="name" className="form-label">
                        Icon Image
                      </Form.Label>
                      <Form.Control
                        name="iconImage"
                        id="iconImage"
                        className="form-control"
                        placeholder="Enter Product Icon"
                        type="file"
                        onChange={(e: any) =>
                          formik.setFieldValue("iconImage", e.target.files[0])
                        }
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.iconImage && formik.errors.iconImage
                            ? true
                            : false
                        }
                        required
                      />
                      {formik.touched.iconImage && formik.errors.iconImage ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.iconImage}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Form.Label htmlFor="name" className="form-label">
                        Product name
                      </Form.Label>
                      <Form.Control
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Enter Product name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        isInvalid={
                          formik.touched.name && formik.errors.name
                            ? true
                            : false
                        }
                        required
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.name}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>
                  </Col>
                  {/* category Id */}
                  <Row>
                    <Col md={4}>
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
                          onChange={(e) => {
                            formik.setFieldValue("categoryId", e.target.value);
                            formik.handleChange;
                            dispatch(GetAllSubCategoryById(e.target.value));
                          }}
                          onBlur={formik.handleBlur}
                          // value={formik.values.categoryId}
                          isInvalid={
                            formik.touched.categoryId &&
                            formik.errors.categoryId
                              ? true
                              : false
                          }
                          required
                        >
                          <option value="">Select this menu</option>
                          {category.map((item: any) => {
                            return (
                              <option value={item._id}>
                                {item.categoryName}
                              </option>
                            );
                          })}
                        </Form.Control>
                        {formik.touched.categoryId &&
                        formik.errors.categoryId ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.categoryId}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <Form.Label
                          htmlFor="subCategoryId"
                          className="form-label"
                        >
                          Sub Category Name
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="subCategoryId"
                          id="subCategoryId"
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            formik.handleChange;
                            formik.setFieldValue(
                              "subCategoryId",
                              e.target.value
                            );
                          }}
                          onBlur={formik.handleBlur}
                          // value={formik.values.subCategoryId}
                          isInvalid={
                            formik.touched.subCategoryId &&
                            formik.errors.subCategoryId
                              ? true
                              : false
                          }
                          required
                        >
                          <option value="">Select this menu</option>
                          {subcat.map((item: any) => {
                            return (
                              <option value={item._id}>
                                {item.subCategoryName}
                              </option>
                            );
                          })}
                        </Form.Control>
                        {formik.touched.subCategoryId &&
                        formik.errors.subCategoryId ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.subCategoryId}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <Form.Label
                          htmlFor="subCategoryId"
                          className="form-label"
                        >
                          Unit Value
                        </Form.Label>
                        <Form.Control
                          name="unit_value"
                          id="unit_value"
                          type="text"
                          placeholder="Enter Unit Value"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.unit_value}
                          isInvalid={
                            formik.touched.unit_value &&
                            formik.errors.unit_value
                              ? true
                              : false
                          }
                          required
                        />

                        {formik.touched.unit_value &&
                        formik.errors.unit_value ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.unit_value}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <Form.Label
                          htmlFor="subCategoryId"
                          className="form-label"
                        >
                          Unit
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="unit"
                          id="unit"
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            formik.handleChange;
                            formik.setFieldValue("unit", e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                          // value={formik.values.unit}
                          isInvalid={
                            formik.touched.unit && formik.errors.unit
                              ? true
                              : false
                          }
                          required
                        >
                          <option value="">Select Unit Here</option>
                          {units.map((item: any) => {
                            return <option value={item}>{item}</option>;
                          })}
                        </Form.Control>
                        {formik.touched.unit && formik.errors.unit ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.unit}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div>
                        <FormControlLabel
                          control={
                            <Switch
                              {...formik.getFieldProps("subscription_active")}
                              checked={formik.values.subscription_active}
                            />
                          }
                          label="Subscription Available"
                          sx={{ mb: 2 }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col md={4}>
                      <div>
                        <Form.Label htmlFor="name" className="form-label">
                          Regular Price
                        </Form.Label>
                        <Form.Control
                          name="regularPrice"
                          id="regularPrice"
                          className="form-control"
                          placeholder="Regular Price"
                          type="number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.regularPrice}
                          isInvalid={
                            formik.touched.regularPrice &&
                            formik.errors.regularPrice
                              ? true
                              : false
                          }
                          required
                        />
                        {formik.touched.regularPrice &&
                        formik.errors.regularPrice ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.regularPrice}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={4}>
                      {/* Price */}
                      <div>
                        <Form.Label htmlFor="email" className="form-label">
                          Price
                        </Form.Label>
                        <Form.Control
                          name="price"
                          id="price"
                          className="form-control"
                          placeholder="Price"
                          type="number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                          isInvalid={
                            formik.touched.price && formik.errors.price
                              ? true
                              : false
                          }
                          required
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.price}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col md={4}>
                      <div>
                        <Form.Label htmlFor="name" className="form-label">
                          Product Type
                        </Form.Label>
                        <Form.Control
                          name="product_type"
                          id="product_type"
                          className="form-control"
                          placeholder="Product Type"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.product_type}
                          isInvalid={
                            formik.touched.product_type &&
                            formik.errors.product_type
                              ? true
                              : false
                          }
                          required
                        />
                        {formik.touched.product_type &&
                        formik.errors.product_type ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.product_type}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={5}>
                      <div>
                        <FormControl>
                          <Form.Label id="demo-multiple-name-label">
                            Subscription type
                          </Form.Label>
                          <Select
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            sx={{ height: 40, width: 180 }}
                            onChange={handleChange}
                            input={<OutlinedInput label="Subcription Type" />}
                          >
                            {subscription_types.map((name: any) => (
                              <MenuItem
                                key={name}
                                value={name}
                                // style={getStyles(name, personName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Col>
                    <Col md={4}>
                      {/* Price */}
                      <div>
                        <Form.Label htmlFor="email" className="form-label">
                          Membership Offer
                        </Form.Label>
                        <Form.Control
                          name="membership_offer"
                          id="membership_offer"
                          className="form-control"
                          placeholder="Membership offer"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.membership_offer}
                          isInvalid={
                            formik.touched.membership_offer &&
                            formik.errors.membership_offer
                              ? true
                              : false
                          }
                          required
                        />
                        {formik.touched.membership_offer &&
                        formik.errors.membership_offer ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.membership_offer}
                          </Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={5}>
                      <div>
                        <Form.Label>Select locations</Form.Label>
                        <Form.Control
                          as="select"
                          value={locationArray.map((item: any) => item)}
                          className="form-control"
                          onChange={handleChangeSelectedocation}
                        >
                          <option>Select location</option>
                          {locationData.map((item: any) => (
                            <option value={JSON.stringify(item)}>
                              {item.locationName}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                      <div>
                        <ul>
                          {locationArray.map((item: any) => (
                            <li>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Col>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    Short Description
                  </Form.Label>
                  {editor ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={formik.values.shortdescription}
                      onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();

                        formik.setFieldValue("shortdescription", data);
                      }}
                    />
                  ) : (
                    <p>ckeditor5</p>
                  )}
                  {formik.touched.shortdescription &&
                  formik.errors.shortdescription ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.shortdescription}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    Description
                  </Form.Label>
                  {editor ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={formik.values.description}
                      onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();

                        formik.setFieldValue("description", data);
                      }}
                    />
                  ) : (
                    <p>ckeditor5</p>
                  )}
                  {formik.touched.description && formik.errors.description ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.description}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="sgst" className="form-label">
                    SGST
                  </Form.Label>
                  <Form.Control
                    name="sgst"
                    id="sgst"
                    className="form-control"
                    placeholder="Enter SGST"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sgst}
                    isInvalid={
                      formik.touched.sgst && formik.errors.sgst
                        ? true
                        : false
                    }
                    required
                  />
                  {formik.touched.sgst && formik.errors.sgst ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.sgst}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="cgst" className="form-label">
                    CGST
                  </Form.Label>
                  <Form.Control
                    name="cgst"
                    id="cgst"
                    className="form-control"
                    placeholder="Enter CGST"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cgst}
                    isInvalid={
                      formik.touched.cgst && formik.errors.cgst
                        ? true
                        : false
                    }
                    required
                  />
                  {formik.touched.cgst && formik.errors.cgst ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.cgst}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label htmlFor="igst" className="form-label">
                    IGST
                  </Form.Label>
                  <Form.Control
                    name="igst"
                    id="igst"
                    className="form-control"
                    placeholder="Enter IGST"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.igst}
                    isInvalid={
                      formik.touched.igst && formik.errors.igst
                        ? true
                        : false
                    }
                    required
                  />
                  {formik.touched.igst && formik.errors.igst ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.igst}
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

export default ProductForm;
