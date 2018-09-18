import React from 'react'
import PropTypes from 'prop-types'

import style from './style'

const tabs = {
  last_hour: 'Last hour',
  today: 'Today',
  yesterday: 'Yesterday',
  last_3days: 'Last 3 days'
}

const Tabs = ({ setTab, tab }) => (
  <ul className={style.tabs__list}>
    {Object.entries(tabs).map(([name, text]) => (
      <li 
        key={name}
        className={style.tabs__item}>
        <a 
          href=''
          className={`${style.tabs__btn} ${name === tab 
            ? style.active 
            : ''}`
          }
          onClick={setTab(name)}>
          {text}
        </a>
      </li>
    ))}
  </ul>
)

Tabs.propTypes = {
  setTab: PropTypes.func, 
  tab: PropTypes.string
}

export default Tabs