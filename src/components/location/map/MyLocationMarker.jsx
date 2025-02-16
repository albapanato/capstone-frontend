import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const MyLocationMarker = ({ setPosition }) => {

  const map = useMap()

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng)

      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map, setPosition])

  return null
}

export default MyLocationMarker
