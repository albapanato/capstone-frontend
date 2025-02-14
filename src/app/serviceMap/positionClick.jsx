import React, { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";

function PositionClick({ setUbicacion }) {
  //icon properties
  const icon = L.icon({
    iconSize: [45, 48],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    // iconUrl: process.env.PUBLIC_URL + "/marker_orange.png",
    iconUrl: "/marker_orange.png",
  });

  const [positionClick, setPositionClick] = useState(null); //state save to location

  //create new location
  useMapEvents({
    click(e) {
      console.log("------>Cordenadas marcadas---->", e.latlng);
      setPositionClick(e.latlng);
      setUbicacion({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return positionClick === null ? null : (
    <Marker position={positionClick} icon={icon} />
  );
}

export default PositionClick;
