import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ requestedPath }: any) => {
  console.log("requestedPath:", requestedPath);
  return (
    <>
      <div className="loader-container">
        <div className="text-container">
          <Spinner animation="border"></Spinner>
        </div>
        <h3 className="loader-text-layout">
          {requestedPath.split("/")[2] === "all-feeds"
            ? "Getting All Jobs"
            : requestedPath.split("/")[2] === "view-pipeline"
            ? "Getting All Pipelines"
            : requestedPath.split("/")[2] === "client"
            ? "Getting Jobs from client"
            : requestedPath.split("/")[2]}
        </h3>
      </div>
    </>
  );
};

export default LoadingSpinner;
