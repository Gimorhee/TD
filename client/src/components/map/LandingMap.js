import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZ2ltb3JoZWUiLCJhIjoiY2t0NDhzdDBoMGZqdzJ4dWNhNGVxZTdiNSJ9.5tKlTXRt5ROyhKEWQx2nYg";

const LandingMap = ({}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.75);
  const [lat, setLat] = useState(49.19);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);
  return (
    <div ref={mapContainer} className="map-container">
      <div className="info">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
};

LandingMap.propTypes = {};

export default LandingMap;
