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
  const {
    contentContacts,
    GoogleOpeningHours: { open_now, weekday_text },
  } = useSelector((state) => state.websiteContent)

  const lat = Number(
    contentContacts.googleLocation?.split('@')[1].split(',')[0]
  )
  const lng = Number(
    contentContacts.googleLocation?.split('@')[1].split(',')[1]
  )
  const center = { lat, lng }

  return (
    <Wrapper>
      <div className='google-time'>
        <div className='title'>
          We are currently <strong>{open_now ? 'Open' : 'Closed'}.</strong>
        </div>
        <div className='body '>
          <span>Operational hours </span>
          <ul>
            {weekday_text?.map((item) => {
              return <li>{item}</li>
            })}
          </ul>
        </div>
      </div>

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
  grid-template-columns: 1fr 2fr;
  align-items: center;
  padding: 1rem;
  background-color: var(--grey-2);
  .body {
    display: grid;
    justify-content: center;

    span {
      margin: 0 auto;
    }
    ul {
      padding: 1rem;
      color: var(--grey-5);
    }
  }
  .map-container {
    width: 100%;
    height: 60vh;
  }
  @media (min-width: 820px) {
    min-height: calc(100vh - 53px);
    .map-container {
      width: 100%;
      height: 80vh;
    }
  }
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`
