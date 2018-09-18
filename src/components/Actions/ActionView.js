import React from 'react'
import { compose, withHandlers } from 'recompose'

import style from './style'
import { splitBy3 } from 'Src/helpers'
import pic from 'Assets/images/Shape.png'

const ActionView = ({ name, current, previous, getMoment, getPercentage }) => (
  <div className={`${style.action__view} ${name === 'Clicks' ? style.red : ''}`}>
    <div className={`${style.action__icon}`} >
      <img src={pic} />
    </div>
    <div className={style.action__text_wrapper}>
      <h3 className={style.action__title}>
        {name}
        {getPercentage() && <span>
          {`${getPercentage()}`.slice(0, `${getPercentage()}`.indexOf('.') + 2)}%
        </span>}
      </h3>
      <span className={style.action__current_value}>
        {current() && splitBy3(current())} <small>{getMoment()}</small>
      </span>
      <span className={style.action__previous_value}>
        {previous() && splitBy3(previous())} <small>Previous</small>
      </span>
    </div>
  </div>
)


export default compose(
  withHandlers({
    current: ({ data, tab, name }) => () => {
      name = name.toLowerCase()
      return data[`${name}_current_${tab}`]
    },
    previous: ({ data, tab, name }) => () => {
      name = name.toLowerCase()
      return data[`${name}_previous_${tab}`]
    },
    getMoment: ({ tab }) => () => {
      switch (tab){
        case 'last_hour':
          return 'Last Hour'
        case 'today': 
          return 'Today'
        case 'yesterday': 
          return 'Yesterday'
        case 'last_3days': 
          return 'Last 3 days'
        default:
          return tab
      }
    }
  }),
  withHandlers({
    getPercentage: ({ previous, current }) => () => (
      (current() && previous()) 
        ? (current() / previous()) * 100 - 100
        : null
    ),
  })
)(ActionView)