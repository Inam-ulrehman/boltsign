import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getStateValues } from '../../features/product/productSlice'

const LandingFeatureServices = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { newServices } = useSelector((state) => state.service)

  const handleClick = (category) => {
    navigate(`/services`)
    dispatch(getStateValues({ name: 'searchCategory', value: category }))
  }
  return (
    <Wrapper>
      <div className='container-header'>
        <div className='title'>
          Feature <span>Services</span>
        </div>
        <div className='title-underline'></div>
      </div>
      <div className='container'>
        {newServices
          .map((item, index) => {
            return (
              <div
                onClick={() => handleClick(item.category)}
                className='container-holder'
                key={index}
              >
                <div className='container-image'>
                  <img
                    src={item.uploadImage[0].secure_url}
                    alt={item.category}
                    title={item.category}
                    loading='eager'
                    width='100%'
                    height='100%'
                  />
                </div>
                <div className='container-paragraph'>
                  <p>{item.category}</p>
                </div>
              </div>
            )
          })
          .slice(0, 4)}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: grid;
  align-content: space-evenly;
  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 8px;
    span {
      color: var(--primary-5);
    }
  }
  .container-holder {
    max-width: 280px;
    box-shadow: var(--shadow-1);
    position: relative;
    transition: var(--transition-1);
    :hover {
      cursor: pointer;
      box-shadow: var(--shadow-3);
      .container-paragraph {
        opacity: 1;
        background-color: var(--primary-9);
      }
      p {
        color: var(--white);
      }
    }
  }
  .container-image {
    width: 280px;
    height: 280px;
    img {
      width: 100%;
    }
  }
  .container-paragraph {
    position: absolute;
    bottom: 0;
    padding: 5px;
    background: var(--primary-5);
    opacity: 0.8;
    width: 100%;
    text-align: center;
    transition: var(--transition-1);
    p {
      color: var(--white);
      margin: 0;
    }
  }
  @media (min-width: 992px) {
    min-height: calc(100vh - 3.2rem);
  }

  @media (max-width: 1024px) {
    .container-holder {
      margin-top: 1rem;
      max-width: 380px;
    }
    .container-image {
      width: 380px;
      height: 380px;
    }
  }
  @media (max-width: 820px) {
    .container-holder {
      margin-top: 1rem;
      max-width: 280px;
    }
    .container-image {
      width: 280px;
      height: 280px;
    }
  }

  @media (max-width: 620px) {
    min-height: auto;
    .container-holder {
      margin-top: 1rem;
      max-width: 80vw;
    }
    .container-image {
      width: 80vw;
      height: auto;
    }
  }
`
export default LandingFeatureServices
