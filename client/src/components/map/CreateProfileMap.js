import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZ2ltb3JoZWUiLCJhIjoiY2t0NDhzdDBoMGZqdzJ4dWNhNGVxZTdiNSJ9.5tKlTXRt5ROyhKEWQx2nYg";

const CreateProfileMap = ({ profile, handleAddress, handleCoordinates, handleContext }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.75);
  const [lat, setLat] = useState(49.19);
  const [zoom, setZoom] = useState(7.5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // GEOCONTROL
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }).on("geolocate", (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude;
        const position = [lon, lat];
        console.log(position);
      })
    );

    // GEOCODER
    // bbox value
    const swLng = map.current.getBounds()._sw.lng;
    const swLat = map.current.getBounds()._sw.lat;
    const neLng = map.current.getBounds()._ne.lng;
    const neLat = map.current.getBounds()._ne.lat;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search by address within *BC*",
      marker: {
        color: "orange",
      },
      countries: "ca",
      bbox: [swLng, swLat, neLng, neLat],
      filter: function (item) {
        return item.context.some((i) => {
          return i.id.split(".").shift() === "region" && i.text === "British Columbia";
        });
      },
    }).on("result", (e) => {
      console.log("DATA: ", e.result);
      const coordinates = JSON.stringify(e.result.geometry.coordinates);
      const context = JSON.stringify(e.result.context);
      handleAddress(e.result.place_name);
      handleCoordinates(coordinates);
      handleContext(context);
    });

    document.getElementById("mapbox-geocoder").appendChild(geocoder.onAdd(map.current));
  }, [profile]);

  return (
    <div className="createProfileMap">
      <div id="mapbox-geocoder"></div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

export default CreateProfileMap;
