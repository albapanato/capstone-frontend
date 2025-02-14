import Map from "../components/map/map";
import PositionClick from "../serviceMap/positionClick";
import LoadMarker from "../serviceMap/loadMarker";

const dbLatLng = [
  ["37.09771925785008", "-3.6212041382211284"],
  ["37.13430446776906", "-3.667907755547893"],
];

const text = [
  <div>
    <h2>Incidencia 1</h2>
    <p>Barranco de los Priscos</p>
  </div>,
  <h2>Incidencia 2</h2>,
];
function Ubication() {
  return (
    <div>
      <Map
        PositionClick={PositionClick}
        LoadPosition={dbLatLng}
        LoadMarker={LoadMarker}
        text={text}
      />
    </div>
  );
}

export default Ubication;
