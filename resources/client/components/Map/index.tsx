import React, { useState, useEffect, useRef } from 'react'
import Mapboxgl from 'mapbox-gl'

import { MapContainer } from './styles/Map'

Mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN ?? ''

const Mapbox: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    const map = new Mapboxgl.Map({
      // @ts-ignore
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    map.on('move', () => {
      setLng(parseInt(map.getCenter().lng.toFixed(4)))
      setLat(parseInt(map.getCenter().lat.toFixed(4)))
      setZoom(parseInt(map.getZoom().toFixed(2)))
    })
    return () => map.remove()
  }, [])

  return <MapContainer ref={mapContainer} />
}

export default Mapbox
