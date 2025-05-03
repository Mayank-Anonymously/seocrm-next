import React, { useEffect, useState } from "react";
import {
  Circle,
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";

const MapComponent: React.FC = () => {
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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [marker, setMarker] = useState<string>("");

  useEffect(() => {
    // Fetch locations based on the selected locality/country in India
    if (selectedLocation) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${selectedLocation}&key=${apiKey}&result_type=locality`
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
    }
  }, [selectedLocation, apiKey]);

  const handleBoundaryInputChange = (selected: any) => {
    console.log(selected);
    // setSelectedLocation(selected[0]?.name || "");
    // setCircleRadius(1000);
  };

  const handleMapClick = (e: any) => {
    // Set marker position and marker title on map click
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setMarker(`Custom Marker at (${newPosition.lat}, ${newPosition.lng})`);
  };

  const placeapi = (value: string) => {
    setInpValue(value);
    const autocompleteUrl = `http://192.168.29.91:9291/api/v1/google/query-all-places/${inValue}`;

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
    console.log("filteredItems:", filteredItems);
    setFilteredData(filteredItems);
    setShowDropdown(true);
  };

  const handleItemClick = (item: any) => {
    setSelectedLocation(item.main_text);
    setShowDropdown(false);
    setCircleRadius(10000);
    setMarker(item.main_text);
  };

  console.log(localityBoundary);

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <div className="dropdown">
          <input
            type="text"
            value={inValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type something..."
          />
          {showDropdown && (
            <ul className="dropdown-list">
              {filteredData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item.structured_formatting)}
                >
                  {item.structured_formatting.main_text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {/* <Typeahead
            id="boundary-input"
            labelKey={(option) => option.main_text}
            options={placeName.map((item) => item.structured_formatting)}
            placeholder="Type a city name"
            onChange={(e) => handleBoundaryInputChange(e)}
          /> */}
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={20}
          center={center}
          onClick={handleMapClick}
        >
          {/* {localityBoundary.length > 0 && (
            <Polygon
              paths={localityBoundary}
              options={{
                fillColor: "#00FF00",
                fillOpacity: 0.35,
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 1,
              }}
            />
          )} */}
          {/* {countryBoundary.length > 0 && (
            <Polygon
              paths={countryBoundary}
              options={{
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          )} */}
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
    </>
  );
};

export default MapComponent;
