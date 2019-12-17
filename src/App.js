import React, { Component } from "react";

import Map from "./components/map";
import Panel from "./components/panel";

import location from "./location";

class App extends Component {
  state = {
    address: null
  };

  geocode = address => {
    fetch(
      `http://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1&addressdetails=1`
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        const location = json[0];
        const address = location.address;
        const { lat, lon } = location;

        this.setState({ address, lat: parseFloat(lat), lon: parseFloat(lon) });
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
    this.geocode(location);
  }

  render() {
    const { address, lat, lon } = this.state;
    const coordinatesAreAvailable = Boolean(lat && lon);

    return (
      <div className="app-wrapper">
        {coordinatesAreAvailable && <Map lon={lon} lat={lat} />}
        <Panel {...address} lon={lon} lat={lat} />
      </div>
    );
  }
}

export default App;
