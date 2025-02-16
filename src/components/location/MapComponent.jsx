'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./map/Map'), {
  ssr: false, // Deshabilita el SSR para evitar errores con `window`
})

const MapComponent = ({
  zoom,
  position,
  setLocation,
  relocate,
  locations,
  enableSelectPosition,
  showPosition,
}) => {

  return (
    <Map
      zoom={zoom}
      position={position}
      relocate={relocate}
      setLocation={setLocation}
      enableSelectPosition={enableSelectPosition}
      locations={locations}
      showPosition={showPosition}
    />
  )
}

export default MapComponent
