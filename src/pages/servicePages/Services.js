import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import List from '../../components/service/List'
import Pagination from '../../components/service/Pagination'
import ServiceCategory from '../../components/service/ServiceCategory'
import Search from '../../components/service/Search'
import { getAllServicesThunk } from '../../features/service/serviceSlice'
const Services = () => {
  const dispatch = useDispatch()
  const { service } = useSelector((state) => state)
  const { searchTitle, searchCategory, page, limit, count, sort, feature } =
    service

  // ==== handle Category button

  useEffect(() => {
    dispatch(
      getAllServicesThunk({
        searchTitle,
        searchCategory,
        page,
        limit,
        count,
        sort,
        feature,
      })
    )
    // eslint-disable-next-line
  }, [searchCategory, searchTitle, page, limit, count, sort, feature])
  return (
    <Wrapper>
      <Helmet>
        <title>Services</title>
        <meta
          name='description'
          content='Shop online thousands of services. '
        />
        <link rel='canonical' href='/service' />
      </Helmet>
      <ServiceCategory />
      <div className='h1'>
        <h1 className='title'>Find your favorite service</h1>
        <div className='title-underline'></div>
      </div>
      <Search />
      <List />
      <Pagination />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 61px);
  .h1 {
    margin-bottom: 5px;
    margin-top: -18px;
    background-color: var(--grey-2);
    h1 {
      margin-top: 0px;
      font-size: 2rem;
      color: var(--grey-5);
    }
  }
  /* ====Service */
  .service-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    background: var(--primary-8);
    :hover {
      background: var(--primary-5);
    }
  }
  .active {
    background: var(--primary-5);
  }
  @media (max-width: 600px) {
    .category-holder {
      padding-right: 0rem;
    }
  }
`
export default Services
