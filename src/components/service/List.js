import React from 'react'
import { useSelector } from 'react-redux'
import ServiceDesign from './ServiceDesign'

const List = () => {
  const { list, isLoading } = useSelector((state) => state.service)
  if (isLoading) {
    return (
      <div>
        <div className='title'>Loading...</div>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <div>
      <div className='service-holder'>
        {list.map((item, index) => {
          return <ServiceDesign key={item._id} item={item} />
        })}
      </div>
    </div>
  )
}

export default List
