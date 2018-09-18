import React from 'react'
import { compose, withProps, withHandlers } from 'recompose'

import style from './style'
import ErrorsBar from './ErrorsBar'

const ErrorsDetail = ({ errors, getErrorsPercentage }) => (
  <div className={style.errors__detail}>
    {errors && errors.size
      ? <ErrorsBar getErrorsPercentage={getErrorsPercentage} />
      : <h2>No Errors</h2>
    }
    <ul className={style.errors__detail_list}>
      {errors && errors.map(({ code, count }, idx) => (
        <li key={idx} className={style.error__detail_item}>
          <i className={style.error__detail_icon} />
          <span>{code ? `Error ${code}: ${count}` : `Other: ${count}`}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default compose(
  withProps(({ tab, ...props }) => ({
    errors: props[`errors_${tab}`]
  })),
  withHandlers({
    getErrorsPercentage: ({ errors }) => () => {
      const list = {}
      let total = 0
      errors.forEach(({ count }) => {
        total += count
      })
      errors.forEach(({ code, count }) => {
        list[code ? code : 'other'] = (count / total) * 100
      })
      return list
    }
  })
)(ErrorsDetail)