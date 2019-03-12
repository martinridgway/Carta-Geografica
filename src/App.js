import React, { Component } from "react";

import { fromLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";

import Map from "./components/map";
import Panel from "./components/panel";

class App extends Component {
  lon = -71.0606;
  lat = 42.3596;

  state = {
    address: null
  };

  centerLonLat = [this.lon, this.lat];
  centerWebMercator = fromLonLat(this.centerLonLat);
  centerDegrees = toStringHDMS(this.centerLonLat, 1); //convert the co-ordinates to degrees, minutes, and seconds

  simpleReverseGeocoding = () => {
    fetch(
      `http://nominatim.openstreetmap.org/reverse?format=json&lon=${
        this.lon
      }&lat=${this.lat}`
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ address: json.address });
        this.modifyMeta();

        document.getElementById("map-tagline").innerHTML = this.centerDegrees; // display deg, min, sec in our panel
      });
  };

  modifyMeta() {
    const { city, state } = this.state.address;

    var m = document.createElement("meta");
    m.name = "description";
    m.content = `A map of ${city}, ${state}`;
    document.head.appendChild(m);
    document.title = m.content;
  }

  componentDidMount() {
    this.simpleReverseGeocoding(this.lon, this.lat);
  }

  render() {
    const { address } = this.state;
    return (
      <div className="App-header">
        <Map center={this.centerWebMercator} />
        <Panel {...address} />
      </div>
    );
  }
}

export default App;
