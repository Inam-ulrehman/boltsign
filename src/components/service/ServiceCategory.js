import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStateValues, clearState } from '../../features/service/serviceSlice'
import ScrollHook from '../../hooks/ScrollHook'

const ServiceCategory = () => {
  const dispatch = useDispatch()
  const { category, searchCategory } = useSelector((state) => state.service)

  const handleCategory = (e) => {
    dispatch(clearState())
    ScrollHook()
    const value = e.target.value
    if (value === 'all') {
      return dispatch(getStateValues({ name: 'searchCategory', value: '' }))
    }
    dispatch(getStateValues({ name: 'searchCategory', value }))
  }

  const handleActive = (index) => {
    dispatch(getStateValues({ name: 'categoryIndex', value: index }))
  }

  return (
    <Wrapper>
      <ul className='category-holder'>
        {category.map((item, index) => {
          return (
            <li onClick={handleCategory} key={index}>
              <button
                onClick={() => handleActive(index)}
                type='button'
                className={item === searchCategory ? 'btn active' : 'btn'}
                value={item}
              >
                {item}
              </button>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: sticky;
  top: 3.2rem;
  z-index: 1;
  .category-holder {
    background: var(--primary-8);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    button {
      margin: 0.5rem;
    }
  }
`
export default ServiceCategory
