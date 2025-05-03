import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { FormikProvider, useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { PostProduct } from "Components/slices/product/thunk";
import {
  GetAllCategory,
  GetAllSubCategoryById,
} from "Components/slices/category/thunk";
import {
  Circle,
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { baseURL } from "Components/helpers/url_helper";
import { useDropzone } from "react-dropzone";
import { Addnewlocation } from "../../slices/location/thunk";
const units = ["kg", "gm", "ltr", "ml"];
const subscription_types = ["Daily", "Weekly", "One-time", "Alternatively"];

const LocationForm = () => {
  const dispatch: any = useDispatch();
  const editorRef = useRef<any>();
  const mapContainerStyle: React.CSSProperties = {
    width: "80%",
    height: "400px",
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
  const [circleRadius, setCircleRadius] = useState<any>(0); // 20 km in meters
  const [inValue, setInpValue] = useState<string>("");
  const [placeName, setPlaceName] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [marker, setMarker] = useState<string>("");
  const { category, subcat } = useSelector((state: any) => ({
    category: state.CategorySlice.categorydata,
    subcat: state.CategorySlice.subcat,
  }));
  const formik: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      location: [],
      locationName: "",
      radius: 0,
    },
    validationSchema: Yup.object({
      location: Yup.array().required("Required"),
    }),
    onSubmit: (values: any) => {
      dispatch(Addnewlocation(values));
    },
  });

  useEffect(() => {}, []);

  const handleMapClick = (e: any) => {
    // Set marker position and marker title on map click
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setMarker(`Custom Marker at (${newPosition.lat}, ${newPosition.lng})`);
  };

  const handleItemClick = (item: any) => {
    var location = `${item.main_text}, ${item.secondary_text}`;
    formik.setFieldValue("locationName", location);
    setSelectedLocation(item.main_text);
    setShowDropdown(false);
    setMarker(item.main_text);
    handleFetchLocation(location);
  };
  const handleFetchLocation = (location: any) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}&result_type=locality`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          setCenter({
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          });
          const bounds = result.geometry.bounds;
          formik.setFieldValue("location", [
            { lat: bounds.northeast.lat, lng: bounds.northeast.lng },
            { lat: bounds.northeast.lat, lng: bounds.southwest.lng },
            { lat: bounds.southwest.lat, lng: bounds.southwest.lng },
            { lat: bounds.southwest.lat, lng: bounds.northeast.lng },
          ]);
          setLocalityBoundary([
            { lat: bounds.northeast.lat, lng: bounds.northeast.lng },
            { lat: bounds.northeast.lat, lng: bounds.southwest.lng },
            { lat: bounds.southwest.lat, lng: bounds.southwest.lng },
            { lat: bounds.southwest.lat, lng: bounds.northeast.lng },
          ]);

          // ... rest of the code remains unchanged
        }
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const placeapi = (value: string) => {
    const autocompleteUrl = `${baseURL}/google/query-all-places/${value}`;

    fetch(autocompleteUrl)
      .then((response) => response.json())
      .then((data) => {
        setPlaceName(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleInputChange = (value: string) => {
    placeapi(value);
    const inp = value.toLowerCase();
    const filteredItems = placeName.filter((item: any) =>
      item.structured_formatting.main_text.toLowerCase().includes(inp)
    );
    setFilteredData(filteredItems);
    setShowDropdown(true);
  };
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
                  <Col>
                    <div>
                      <Form.Label htmlFor="name" className="form-label">
                        Location Name
                      </Form.Label>
                      <Form.Control
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Enter Place name"
                        type="text"
                        value={formik.values.locationName}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          formik.setFieldValue("locationName", e.target.value);
                          handleInputChange(e.target.value);
                        }}
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
                    <ul className="dropdown-list">
                      {filteredData.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            handleItemClick(item.structured_formatting);
                          }}
                        >
                          {item.structured_formatting.main_text} ,{" "}
                          {item.structured_formatting.secondary_text}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Form.Label htmlFor="radius" className="form-label">
                        Map Radius
                      </Form.Label>
                      <Form.Control
                        name="radius"
                        id="radius"
                        className="form-control"
                        placeholder="Enter Radius"
                        type="number"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          if (e.target.value.startsWith("0")) {
                            console.error(
                              "TypeError :  Radius Value Can not Start with Zero (0)"
                            );
                          } else if (e.target.value === "") {
                            console.error(
                              "TypeError :  Blank Value Can not Start with Zero (0)"
                            );
                          } else {
                            formik.setFieldValue(
                              "radius",
                              JSON.parse(e.target.value)
                            );
                            setCircleRadius(JSON.parse(e.target.value));
                          }
                        }}
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
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={20}
          center={center}
          onClick={handleMapClick}
        >
          {markerPosition && (
            <Marker position={markerPosition} title={marker} />
          )}

          <Circle
            center={center}
            radius={circleRadius}
            options={{
              fillColor: "#0000FF",
              fillOpacity: 0.2,
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </LoadScript>
      <Col>
        <Row style={{ margin: 5 }}>
          <Button type="submit" onClick={(e) => formik.handleSubmit(e)}>
            Add Location
          </Button>
        </Row>
      </Col>
    </>
  );
};

export default LocationForm;
