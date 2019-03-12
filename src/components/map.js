import React, { Component } from "react";

import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";

import "ol/ol.css";

class Map extends Component {
  componentDidMount() {
    new OlMap({
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: "watercolor"
          })
        }),
        new TileLayer({
          source: new Stamen({
            layer: "terrain-labels"
          })
        })
      ],
      target: "map",
      view: new View({
        center: this.props.center,
        zoom: 15
      })
    });
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
