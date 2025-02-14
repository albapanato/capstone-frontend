import Map from "../components/map/map";
import PositionClick from "../serviceMap/positionClick";
import LoadMarker from "../serviceMap/loadMarker";
import FormUbication from "../components/formUbication/formUbication";
import { useEffect, useState } from "react";

//const dbLatLng =  [["37.09771925785008", "-3.6212041382211284"], ["37.13430446776906", "-3.667907755547893"]];

//const text = [<div><h2>Incidencia 1</h2><p>Barranco de los Priscos</p></div>, <h2>Incidencia 2</h2>];
function PageFormUbication() {
  const [ubication, setUbicacion] = useState(null);
  const [data, setData] = useState([]);
  const [dataForm, setDataForm] = useState({});
  const [err, setErr] = useState([]);

  useEffect(() => {
    console.log("fetch", data);
    fetch("https://gemapp.es/ubicacion", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {})
      .catch(() => {});
  }, [data]);

  function handleClick() {
    //validar datos

    setData({ dataform: dataForm, ubication: ubication });
  }

  return (
    <>
      {/* <Map PositionClick={PositionClick} LoadPosition={dbLatLng} LoadMarker={LoadMarker} text={text} /> */}
      <Map
        setUbicacion={setUbicacion}
        PositionClick={PositionClick}
        LoadMarker={LoadMarker}
      />
      <FormUbication dataForm={dataForm} setDataForm={setDataForm} err={err} />
      <button onClick={handleClick}>Guardar</button>
    </>
  );
}

export default PageFormUbication;
