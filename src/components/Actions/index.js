import React from 'react'
import { compose, withHandlers } from 'recompose'

import style from './style'
import ActionView from './ActionView'
import AdditionInfo from './AdditionInfo'

const Actions = ({ 
  getSearches, 
  getClicks, 
  getBookings, 
  tab, 
  data 
}) => (
  <ul className={style.actions__list}>
    <li className={style.actions__item}>
      <ActionView 
        name='Searches' 
        data={getSearches()}
        tab={tab} />
      <AdditionInfo 
        name='searches'
        data={data}
        tab={tab} />
    </li>
    <li className={style.actions__item}>
      <ActionView 
        name='Clicks' 
        data={getClicks()}
        tab={tab} />
      <AdditionInfo 
        name='clicks'
        data={data}
        tab={tab} />
    </li>
    <li className={style.actions__item}>
      <ActionView 
        name='Bookings' 
        data={getBookings()}
        tab={tab} />
      <AdditionInfo 
        name='bookings'
        data={data}
        tab={tab} />
    </li>
  </ul>
)

export default compose(
  withHandlers({
    getSearches: ({ data }) => () => {
      const list = {}
      Object.entries(data).forEach(([name]) => {
        if (name.includes('searches')) list[name] = data[name]
      })
      return list
    },
    getClicks: ({ data }) => () => {
      const list = {}
      Object.entries(data).forEach(([name]) => {
        if (name.includes('clicks')) list[name] = data[name]
      })
      return list
    },
    getBookings: ({ data }) => () => {
      const list = {}
      Object.entries(data).forEach(([name]) => {
        if (name.includes('bookings')) list[name] = data[name]
      })
      return list
    }
  })
)(Actions)