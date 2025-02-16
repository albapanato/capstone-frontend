import { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";

function PositionClick({ setLocation, icon }) {

  const [positionClick, setPositionClick] = useState(null); //state save to location

  //create new location
  useMapEvents({
    click(e) {
      setPositionClick(e.latlng);
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return positionClick === null ? null : (
    <Marker position={positionClick} icon={icon} />
  );
}

export default PositionClick;
