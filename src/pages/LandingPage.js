import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { GoogleMaps } from '../components/GoogleMaps'
import {
  LandingNewProducts,
  LandingFeatureProduct,
  LandingShare,
  GoogleReviews,
} from '../components/landing'

const LandingPage = () => {
  const { contentContacts, sectionOne, sectionTwo, sectionThree } = useSelector(
    (state) => state.websiteContent
  )

  const mobileLink = `tel:${contentContacts.mobileNumber}`
  return (
    <Wrapper>
      <Helmet>
        <title>{sectionOne?.heading}</title>
        <meta name='description' content={sectionOne?.paragraph} />
        <link rel='canonical' href='/' />
      </Helmet>
      <div className='number'>
        <a href={mobileLink}>
          <span>
            <strong>Call Us @</strong>
          </span>
          {contentContacts.mobileNumber}
        </a>
      </div>
      <LandingShare landingPage={sectionOne} heading={1} />
      <LandingFeatureProduct />
      <LandingShare landingPage={sectionTwo} heading={2} />
      <LandingNewProducts />
      <LandingShare landingPage={sectionThree} heading={3} />
      <GoogleReviews />
      <GoogleMaps />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .number {
    z-index: 4;
    position: fixed;
    right: 0%;
    top: 10%;
    /* border: 2px solid black; */
    background: var(--grey-2);
    box-shadow: var(--shadow-2);
    padding-right: 2rem;
    font-size: 1.5rem;
    padding-left: 5px;
    transition: var(--transition);
    border-top-left-radius: var(--radius-1);
    border-bottom-left-radius: var(--radius-1);
    :hover {
      cursor: pointer;
      box-shadow: var(--shadow-3);
    }
    a {
      color: black;
    }
    strong {
      color: var(--primary-5);
    }
    span {
      margin-right: 0.5rem;
    }
  }
  @media (max-width: 600px) {
    .number {
      display: none;
    }
  }
`
export default LandingPage
