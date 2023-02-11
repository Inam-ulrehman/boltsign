import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>
  return <Map />
}

function Map() {
  const { contentContacts } = useSelector((state) => state.websiteContent)

  const lat = Number(
    contentContacts.googleLocation?.split('@')[1].split(',')[0]
  )
  const lng = Number(
    contentContacts.googleLocation?.split('@')[1].split(',')[1]
  )
  const center = { lat, lng }
  console.log(typeof Number(lng))
  return (
    <Wrapper>
      <div className='google-time'>google time</div>

      <GoogleMap
        zoom={16}
        center={center}
        mapContainerClassName='map-container'
      >
        <MarkerF position={center} />
        {/* SHow street View on Map */}
        {/* <StreetViewPanorama position={center} /> */}
      </GoogleMap>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;

  .map-container {
    width: 100%;
    height: 60vh;
  }
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`
