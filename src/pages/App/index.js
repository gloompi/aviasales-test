import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'

import style from './style.styl'

const App = ({ route }) => (
  <div className={style.app}>
    <Helmet>
      <title>Aviasales Dashboard</title>
    </Helmet>
    <main className={`${style.container} ${style.app_container}`}>
      {renderRoutes(route.routes)}
    </main>
  </div>
)

export default App