import React from 'react'

import style from './style'

const ErrorsBar = ({ getErrorsPercentage  }) => (
  <ul className={style.errors__bar_list}>
    {Object.values(getErrorsPercentage()).map((value, idx) => {
      return <li 
        key={idx}
        style={{width: `${value}%`}}
        className={style.errors__bar_item} />
    })}
  </ul>
)

export default ErrorsBar