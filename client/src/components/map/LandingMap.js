import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZ2ltb3JoZWUiLCJhIjoiY2t0NDhzdDBoMGZqdzJ4dWNhNGVxZTdiNSJ9.5tKlTXRt5ROyhKEWQx2nYg";

const LandingMap = ({ profiles }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.75);
  const [lat, setLat] = useState(49.19);
  const [zoom, setZoom] = useState(9.5);
  const [mapData, setMapData] = useState({
    features: [
      {
        type: "Feature",
        properties: {
          title: "Guildford mall",
          description: "Guildford mall description",
        },
        geometry: {
          coordinates: [-122.803694, 49.19252],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Coquitlam Centre",
          description: "Coquitlam Centre description",
        },
        geometry: {
          coordinates: [-122.7988905, 49.2794845],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Lighthouse Labs",
          description: "A downtown park known for its art installations and unique architecture",
        },
        geometry: {
          coordinates: [-123.108286, 49.281966],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "North Vancouver",
          description: "North Vancouver Sushi Town",
        },
        geometry: {
          coordinates: [-123.108098, 49.323693],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Burnaby Sushi Garden",
          description: "Really famous sushi place in Burnaby",
        },
        geometry: {
          coordinates: [-123.001057, 49.229068],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Richmond General Hospital",
          description: "One of the hospitals in Richmond",
        },
        geometry: {
          coordinates: [-123.146353, 49.168657],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Euroline Windows Inc.",
          description: "Euroline Windows Inc is the manufacturing company",
        },
        geometry: {
          coordinates: [-123.034234, 49.136762],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Langley Casino",
          description: "Langley Casino is very good",
        },
        geometry: {
          coordinates: [-122.6569, 49.105911],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Abbotsford Hana Sushi",
          description: "Abbotsford Hana Sushi is very good",
        },
        geometry: {
          coordinates: [-122.380428, 49.06165],
          type: "Point",
        },
      },
    ],
    type: "FeatureCollection",
  });

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

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
        map.current.loadImage("https://docs.mapbox.com/mapbox-gl-js/assets/cat.png", function (error, image) {
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
              "icon-size": 0.1,
            },
          });
        });
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
    });

    // HANDLE HOVERING POINTS
    map.current.on("mousemove", "points-avatar", function (e) {
      map.current.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates;
      const description = e.features[0].properties;

      //   console.log(e.features[0]);

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
                <div class="">
                  ${description.name}
                </div>
            `
        )
        .addTo(map.current);

      // HANDLE NOT-HOVERING POINTS
      map.current.on("mouseleave", "points-image", function () {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
        if (hoveredStateId) {
          map.current.setFeatureState({ soure: "dummyData", id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = null;
      });
    });

    // console.log("=> ", profiles);
  }, [profiles]);

  return (
    <div className="landingMap">
      <div className="info">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

LandingMap.propTypes = {};

export default LandingMap;
