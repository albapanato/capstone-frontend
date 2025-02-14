import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

function LoadMarker({ marker, text }) {
  //icon properties
  const icon = L.icon({
    iconSize: [45, 48],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    // iconUrl: process.env.PUBLIC_URL + 'marker_orange.svg',
    iconUrl: "/marker_orange.png",
  });

  return (
    <Marker position={marker} icon={icon}>
      <Popup>{text}</Popup>
    </Marker>
  );
}

export default LoadMarker;
