import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  getCart,
  getSingleServiceThunk,
} from '../../features/service/serviceSlice'
import { formatPrice } from '../../utils/helper'

// import { formatPrice } from '../../utils/helper'
const initialState = {
  index: 0,
}

const SingleService = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()
  let [state, setState] = useState(initialState)
  const quantityRef = useRef()
  const { isLoading, singleService, singleServiceImages, cart } = useSelector(
    (state) => state.service
  )

  // ==== handle index

  const handleIndex = (itemIndex) => {
    setState({ ...state, index: itemIndex })
  }

  // ==== handle submit
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault()
    const quantity = Number(quantityRef.current.value)
    if (!quantity) {
      toast.warning('Please select quantity.')
      return
    }
    if (cart.find((item) => item._id === _id)) {
      toast.success('Already in your Cart.', { position: 'bottom-center' })
      return
    }
    const addInCart = { ...singleService, quantity }
    dispatch(getCart(addInCart))
    toast.success('Added in your Cart.', { position: 'bottom-center' })
  }
  useEffect(() => {
    dispatch(getSingleServiceThunk(_id))

    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <Helmet>
        <title>{singleService?.title}</title>
        <meta
          name='description'
          content={singleService.description?.substring(0, 170)}
        />
        <link rel='canonical' href='/service' />
      </Helmet>
      <div className='container-header'>
        <span>
          <Link to={'/services'} className='btn'>
            Category
          </Link>{' '}
          <strong>{singleService.category}</strong>
        </span>
      </div>
      <div className='container'>
        <div className='img'>
          <div className='main-img'>
            <img
              src={singleServiceImages[state.index]?.secure_url}
              alt={singleService.title}
              title={singleService.title}
              loading='eager'
              width='100%'
              height='100%'
            />
          </div>
          <div className='options-img'>
            {singleServiceImages?.map((item, index) => {
              return (
                <div onClick={() => handleIndex(index)} key={index}>
                  <img
                    src={item.secure_url}
                    alt={singleService.title}
                    title={singleService.title}
                    loading='eager'
                    width='100%'
                    height='100%'
                  />
                </div>
              )
            })}
          </div>
        </div>
        {/* ====DESCRIPTION  */}
        <div className='description'>
          <div>
            <h1 className='title'>{singleService.title}</h1>
            <div className='title-underline'></div>
          </div>
          <div className='description-heading'>
            <span>
              <strong>{formatPrice(singleService.amount)}</strong>
            </span>

            {/* ========== CART======START*/}
            {singleService.inStock && singleService?.totalStock > 0 && (
              <div className='cart'>
                <form onSubmit={handleSubmit}>
                  <label>
                    Total Available: <strong>{singleService.totalStock}</strong>
                  </label>
                  <input
                    ref={quantityRef}
                    type='number'
                    defaultValue={1}
                    min='1'
                    max={singleService.totalStock}
                  ></input>
                  <button className='btn' type='submit'>
                    Add to cart
                  </button>
                </form>
              </div>
            )}

            {/* ========== CART======END*/}
          </div>
          <div className='description-box'>
            <p>{singleService.description}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .container-header {
    background-color: var(--primary-2);
    max-width: fit-content;
    padding-right: 5px;
    strong {
      text-transform: capitalize;
    }
  }
  min-height: calc(100vh - 59px);
  padding: 1rem;
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .img,
  .description {
    min-width: 45vw;
    margin: 0 auto;
  }
  .main-img {
    margin-top: 1rem;
    text-align: center;

    img {
      box-shadow: var(--shadow-2);
      border-radius: var(--radius);
      width: 300px;
    }
  }
  /* === small images */
  .options-img {
    border-top: 2px solid var(--primary-5);
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;

    img {
      box-shadow: var(--shadow-2);
      max-width: 80px;
      margin-left: 0.5rem;
      transition: var(--transition);
      :hover {
        cursor: pointer;
        box-shadow: var(--shadow-4);
      }
    }
  }
  /*=== Description */
  .description-heading {
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
    margin-top: 1rem;
    background-color: var(--grey-2);

    span {
      margin: 1rem;
    }
  }

  /* === CART */
  .cart {
    input {
      margin: 1rem;
    }
  }
  .btn {
  }
  .description-box {
    background-color: var(--white);
    box-shadow: var(--shadow-2);
    padding: 1rem;
  }
  @media (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
`
export default SingleService
