import React from 'react'
import { withProps, withHandlers, compose } from 'recompose'

import style from './style'
import ErrorDetail from './ErrorsDetail'

const Errors = ({ ...props, list }) => (
  <section className={style.error__container}>
    <ul className={style.errors__list}>
      {list.map(({ itemName, currentValue, avgValue  }) => (
        <li key={itemName} className={style.error__item}>
          <i className={style.status__icon} />
          <div className={style.text__container}>
            <span className={style.error__primary_text}>
              {`${itemName}: ${currentValue.toString().slice(0, 3)}`}%
            </span>
            <span className={style.error__secondary_text}>
              Average: {avgValue.toString().slice(0, 3)}%
            </span>
          </div>
        </li>
      ))}
    </ul>
    <ErrorDetail {...props} />
  </section>
)

export default compose(
  withHandlers({
    summItems: () => list => list.reduce((acc, item) => {
      if (item === null) item = 0
      return acc + item
    }, 0)
  }),
  withProps(({ data, tab, summItems }) => {
    const currentError = data[`errors_${tab}`] ? data[`errors_${tab}`] : 0
    const currentZero = data[`zeroes_${tab}`] ? data[`zeroes_${tab}`] : 0
    const currentTimeout = data[`timeout_${tab}`] ? data[`timeout_${tab}`] : 0
    const errors = []
    const zeroes = []
    const timeouts = []
    Object.entries(data).forEach(([name, value]) => {
      if (name.includes('error')) errors.push(value)
      if (name.includes('zeroes')) zeroes.push(value)
      if (name.includes('timeout')) timeouts.push(value)
    })
    const avgError = summItems(errors) / errors.length
    const avgZero = summItems(zeroes) / zeroes.length
    const avgTimeout = summItems(timeouts) / timeouts.length
    return {
      list: [{
        itemName: 'Errors',
        currentValue: currentError,
        avgValue: avgError
      }, {
        itemName: 'Zeroes',
        currentValue: currentZero,
        avgValue: avgZero
      }, {
        itemName: 'Timeouts',
        currentValue: currentTimeout,
        avgValue: avgTimeout
      }]
    }
  })
)(Errors)