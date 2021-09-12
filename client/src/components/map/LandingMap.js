import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Moment from "react-moment";
import { Redirect } from "react-router-dom";

mapboxgl.accessToken = "pk.eyJ1IjoiZ2ltb3JoZWUiLCJhIjoiY2t0NDhzdDBoMGZqdzJ4dWNhNGVxZTdiNSJ9.5tKlTXRt5ROyhKEWQx2nYg";

const LandingMap = ({ profiles }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.93);
  const [lat, setLat] = useState(49.21);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // DISABLE MAP SCROLLING
    // map.current.scrollZoom.disable();

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

    // MAP LOCATIO INFO
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(2));
      setLat(map.current.getCenter().lat.toFixed(2));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      const profileData = { type: "FeatureCollection", features: [] };

      profiles.map((profile) => {
        let data = {
          type: "Feature",
          id: Math.random() * 1000000,
          properties: {
            context: profile && profile.mapInfo && JSON.parse(profile.mapInfo.context),
            userId: profile && profile.user._id,
            name: profile && profile.user.name,
            pet: profile && profile.name,
            date: profile && profile.date,
            avatar: profile && profile.user.avatar,
            location: profile && profile.location,
          },
          geometry: {
            type: "Point",
            coordinates: profile && profile.mapInfo && JSON.parse(profile.mapInfo.coordinates),
          },
        };

        profileData.features.push(data);
      });

      if (profileData.features.length > 0) {
        // ADD IMAGE ON MAP
        map.current.loadImage("https://image.flaticon.com/icons/png/512/2064/2064863.png", function (error, image) {
          if (error) throw error;
          map.current.addImage("avatar", image);
          map.current.addSource("avatarImages", {
            type: "geojson",
            data: profileData,
          });
          map.current.addLayer({
            id: "points-avatar",
            type: "symbol",
            source: "avatarImages",
            layout: {
              "icon-image": "avatar",
              "icon-size": 0.07,
            },
          });
        });
        // profileData.features.map((profile) => {
        //   map.current.loadImage(profile.properties.avatar, function (error, image) {
        //     if (error) throw error;
        //     map.current.addImage(profile.properties.userId, image);
        //     map.current.addSource(`avatarImages-${profile.properties.userId}`, {
        //       type: "geojson",
        //       data: profileData.features.find((feature) => feature.properties.userId === profile.properties.userId),
        //     });
        //     map.current.addLayer({
        //       id: `points-avatar-${profile.properties.userId}`,
        //       type: "symbol",
        //       source: `avatarImages-${profile.properties.userId}`,
        //       layout: {
        //         "icon-image": profile.properties.userId,
        //         "icon-size": 0.2,
        //       },
        //     });
        //   });
        // });
      }
    });

    let hoveredStateId = null;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    // HANDLE CLICKING POINTS
    map.current.on("click", "points-avatar", function (e) {
      console.log("=> ", e.features[0]);

      map.current.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates;
      const description = e.features[0].properties;

      if (hoveredStateId) {
        map.current.setFeatureState({ source: "avatarImages", id: hoveredStateId }, { hover: false });
      }

      hoveredStateId = 1;
      map.current.setFeatureState({ source: "avatarImages", id: hoveredStateId }, { hover: true });

      // Handle popup
      popup
        .setLngLat(coordinates)
        .setHTML(
          `
                <a class="landingMapPopup" href="/petProfile/${description.userId}">
                    <img src="${description.avatar}" alt="user-avatar" />

                    <div class="content">
                        <h4>${description.name} & ${description.pet}</h4>
                        <p>${description.location}</p>
                        <span>became member at <small>${description.date.split("T")[0]}</small></span>
                    </div>
                </a>
            `
        )
        .addTo(map.current);
    });

    // HANDLE HOVERING POINTS
    map.current.on("mousemove", "points-avatar", function (e) {
      map.current.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates;
      const description = e.features[0].properties;

      if (hoveredStateId) {
        map.current.setFeatureState({ source: "avatarImages", id: hoveredStateId }, { hover: false });
      }

      hoveredStateId = 1;
      map.current.setFeatureState({ source: "avatarImages", id: hoveredStateId }, { hover: true });

      // Handle popup
      popup
        .setLngLat(coordinates)
        .setHTML(
          `
                <a class="landingMapPopup" href="/petProfile/${description.userId}">
                    <img src="${description.avatar}" alt="user-avatar" />

                    <div class="content">
                        <h4>${description.name} & ${description.pet}</h4>
                        <p>${description.location}</p>
                        <span>became member at <small>${description.date.split("T")[0]}</small></span>
                    </div>
                </a>
            `
        )
        .addTo(map.current);

      // HANDLE NOT-HOVERING POINTS
      map.current.on("mouseleave", "points-avatar", function () {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
        if (hoveredStateId) {
          map.current.setFeatureState({ soure: "avatarImages", id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = null;
      });
    });

    // console.log("=> ", profiles);
  }, [profiles]);

  return (
    <div className="landingMap" id="landingMap">
      {/* <div className="info">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}

      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

LandingMap.propTypes = {};

export default LandingMap;
