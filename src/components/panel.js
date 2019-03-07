import React from "react";

const Panel = props => (
  <div id="title-panel">
    <h1 className="map-title" id="map-title">
      {props.city}
    </h1>
    <h2 className="map-subtitle" id="map-subtitle">
      {props.state}
    </h2>
    <hr />
    <h3 className="map-tagline" id="map-tagline" />
  </div>
);

export default Panel;
