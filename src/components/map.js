import React, { Component } from "react";

import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";
import { fromLonLat } from "ol/proj";

import "ol/ol.css";

class Map extends Component {
  componentDidMount() {
    this.drawMap();
  }

  drawMap = () => {
    const { lon, lat } = this.props;
    const center = fromLonLat([lon, lat]);

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
      controls: [], // removing all default controls from the rendered map
      target: "map",
      view: new View({
        center,
        zoom: 15
      })
    });
  };

  render() {
    return <div id="map" />;
  }
}

export default Map;
