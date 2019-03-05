import 'ol/ol.css';
import './styles.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import {fromLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';

var lon = -71.0606;
var lat = 42.3596;

const centerLonLat = [lon, lat];
const centerWebMercator = fromLonLat(centerLonLat);
const centerDegrees = toStringHDMS(centerLonLat, 1); //convert the co-ordinates to degrees, minutes, and seconds

const map = new Map({
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor'
      })
    }),
    new TileLayer({
      source: new Stamen({
        layer: 'terrain-labels'
      })
    })
  ],
  target: 'map',
  view: new View({
    center: centerWebMercator,
    zoom: 15
  })
});

function simpleReverseGeocoding(lon, lat) {
  fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
    return response.json();
  }).then(function(json) {
    document.getElementById('address').innerHTML = json.display_name;
  })
}

window.onload = function() {
  simpleReverseGeocoding();
}

document.getElementById('map-tagline').innerHTML = centerDegrees; // display deg, min, sec in our panel
