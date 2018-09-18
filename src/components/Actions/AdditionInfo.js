import React, { Fragment } from 'react'
import { compose, withHandlers } from 'recompose'

import style from './style'

const AdditionInfo = ({ getTitle }) => (
  <div className={style.addition__info}>
    {getTitle()}
  </div>
)

export default compose(
  withHandlers({
    getTitle: ({ data, name, tab }) => () => {
      switch (name){
        case 'searches':
          const { mobile_pessimizer, web_pessimizer } = data
          return <Fragment>
            <h2>Mobile traffic: {`${mobile_pessimizer}`.slice(0, 3)}%</h2>
            <h2>Web traffic: {web_pessimizer}%</h2>
            <span className={style.addition__little_txt}>
              You get {`${mobile_pessimizer}`.slice(0, 3)}% on mobile and {web_pessimizer}% on desktop devices.
            </span>
            <span className={style.addition__help}>Help: <a href=''>Searches</a>, <a href=''>Pessimisation</a></span>
          </Fragment>
        case 'clicks':
          const ctr = data[`ctr_${tab}`] || 0
          return <Fragment>
            <h2 className={style.red}>
              CTR: {`${ctr}`.slice(0, `${ctr}`.indexOf('.') + 2)}%
            </h2>
            <span className={style.addition__little_txt}>
              Conversion from searches  to clicks on all devices.
            </span>
            <span className={style.addition__help}>Help: <a href=''>CTR</a>, <a href=''>Clicks</a></span>
          </Fragment>
        case 'bookings':
          const str = data[`str_${tab}`] || 0
          const avg = data[`avg_price_${tab}`] || 0
          return <Fragment>
            <h2>STR: {`${str}`.slice(0, `${str}`.indexOf('.') + 2)}%</h2>
            <h2>Avg. Check: {`${avg}`.slice(0, `${avg}`.indexOf('.') + 2)}</h2>
            <span className={style.addition__little_txt}>
              Conversion from cliks  to bookings on all devices.
            </span>
            <span className={style.addition__help}>
              Help: <a href=''>STR</a>, <a href=''>Bookings</a> <a href=''>Avg. Check</a>
            </span>
          </Fragment>
        default:
          return null
      }
    },
    getLittleText: ({ name }) => () => {

    }
  })
)(AdditionInfo)