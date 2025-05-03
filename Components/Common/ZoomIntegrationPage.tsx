import React from "react";

const ZoomIntegrationPage = () => {
  const iframeStyle = {
    width: "100%",
    height: "100vh", // 100% of the viewport height
    border: "none", // Optional: Removes the iframe border
  };
  return (
    <div>
      <h1>Zoom Integration Page</h1>
      <iframe
        src="https://applications.zoom.us/integration/phone/embeddablephone/home"
        id="zoom-embeddable-phone-iframe"
        allow="clipboard-read; clipboard-write https://applications.zoom.us"
        style={iframeStyle}
      ></iframe>
    </div>
  );
};

export default ZoomIntegrationPage;
