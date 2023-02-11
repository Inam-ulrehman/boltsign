import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatPrice } from '../../utils/helper'

const ProductDesign = ({ item }) => {
  const image = item.uploadImage[0].secure_url

  return (
    <Wrapper>
      <Link to={item._id}>
        <div>
          <span>{formatPrice(item.amount).slice(2, 17)}</span>

          <div className='img-container'>
            <img
              src={image}
              alt={item.title}
              title={item.title}
              loading='lazy'
              width='100%'
              height='100%'
            />
          </div>
        </div>
        <p className='title'>
          <strong>{item.title}</strong>
        </p>
      </Link>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  margin: 5px;
  transition: var(--transition-1);

  :hover {
    box-shadow: var(--shadow-3);
    transform: scale(1.03);
  }
  .title {
    margin-top: 0;
    transition: var(--transition-1);
    padding: 5px;
    max-width: 250px;
    min-height: 4.2rem;
    background-color: var(--grey-2);
    color: var(--grey-5);

    margin-bottom: 0px;
  }
  .img-container {
    max-width: 250px;
    max-height: 250px;
    transition: var(--transition-1);
    img {
      width: 100%;
    }
  }
  span {
    padding: 0 5px;

    color: var(--grey-6);
  }
  @media (max-width: 620px) {
    .img-container {
      max-width: 180px;
      max-height: 180px;
    }

    .title {
      max-width: 180px;
    }
  }
  @media (max-width: 400px) {
    .img-container {
      max-width: 160px;
      max-height: 160px;
    }
  }
`
export default ProductDesign
