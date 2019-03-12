import React, { Component } from "react";

import Map from "./components/map";
import Panel from "./components/panel";

class App extends Component {
  lon = -71.0606;
  lat = 42.3596;

  state = {
    address: null
  };

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
    const { lon, lat } = this;

    return (
      <div className="App-header">
        <Map lon={lon} lat={lat} />
        <Panel {...address} lon={lon} lat={lat} />
      </div>
    );
  }
}

export default App;
