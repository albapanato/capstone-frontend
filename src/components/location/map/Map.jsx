import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MyLocationMarker from './MyLocationMarker'
import PositionClick from './PositionClick'
import './map.css'

function Map({
  zoom = 2,
  position: initialPosition = [51.505, -0.09],
  showPosition = true,
  setLocation,
  enableSelectPosition,
  relocate,
  locations,
}) {
  const basicIcon = {
    iconSize: [30, 32],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  }
  const icon = L.icon({
    ...basicIcon,
    iconUrl: '/blue-marker.png',
  })

  const blackIcon = L.icon({
    ...basicIcon,
    iconUrl: '/black-marker.png',
  })

  const [position, setPosition] = useState(initialPosition)

  return (
    <div className='containerMap'>
      {/* creation of map */}
      <MapContainer id='map' center={position} zoom={zoom} minZoom={2}>
        {/* creation  tile layer  */}
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {/* function to get user location*/}
        {relocate && <MyLocationMarker setPosition={setPosition} />}
        {showPosition && <Marker position={position} icon={blackIcon} />}
        {/* function to position click*/}
        {enableSelectPosition ? (
          <PositionClick setLocation={setLocation} icon={icon} />
        ) : null}

        {locations
          ? locations.map((elem, index) => {
              const { position: elementPosition, popupContent } = elem
              return (
                <Marker
                  key={`${index}-${elem}`}
                  position={elementPosition}
                  icon={icon}
                >
                  {popupContent && <Popup>{popupContent}</Popup>}
                </Marker>
              )
            })
          : null}
      </MapContainer>
    </div>
  )
}

export default Map
