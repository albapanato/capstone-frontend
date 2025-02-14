import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import L from "leaflet";

import React, { useEffect, useState } from "react";

function Map({ setUbicacion, PositionClick, LoadPosition, LoadMarker, text }) {
  const position = [51.505, -0.09];
  return (
    <div className="containerMap">
      {/* creation of map */}
      <MapContainer id="map" center={position} zoom={13}>
        {/* creation  tile layer  */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* function to get user location*/}
        <LocationMarker />
        {/* function to positon click*/}
        {PositionClick ? <PositionClick setUbicacion={setUbicacion} /> : null}

        {LoadPosition
          ? LoadPosition.map((elem, index) => {
              console.log(index);
              return <LoadMarker marker={elem} text={text[index]} />;
            })
          : null}
      </MapContainer>
    </div>
  );
}

function LocationMarker() {
  //icon properties

  const icon = L.icon({
    iconSize: [45, 48],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    // iconUrl: process.env.PUBLIC_URL + "my_location_marker.png",
    iconUrl: "/my_location_marker.png",
  });

  const [position, setPosition] = useState(null);

  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      console.log(e.latlng);
      setPosition(e.latlng);

      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;

      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}></Marker>
  );
}

export default Map;
