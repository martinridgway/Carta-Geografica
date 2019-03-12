import React, { Component } from "react";
import { toStringHDMS } from "ol/coordinate";

class Panel extends Component {
  render() {
    const { lon, lat } = this.props;
    const centerDegrees = toStringHDMS([lon, lat], 1); //convert the co-ordinates to degrees, minutes, and seconds

    return (
      <div id="title-panel">
        <h1 className="map-title" id="map-title">
          {this.props.city}
        </h1>
        <h2 className="map-subtitle" id="map-subtitle">
          {this.props.state}
        </h2>
        <hr />
        <h3 className="map-tagline" id="map-tagline">
          {centerDegrees}
        </h3>
      </div>
    );
  }
}

export default Panel;
