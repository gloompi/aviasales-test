import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
  withState, 
  withHandlers, 
  lifecycle, 
  compose 
} from 'recompose'

import style from './style.styl'
import { fetchData } from 'Ducks/data'
import Tabs from 'Components/Tabs'
import Errors from 'Components/Errors'
import Actions from 'Components/Actions'

const Main = ({ 
  data,
  loaded,
  ...props
}) => (
  <Fragment>
    <h1 className={style.main__title}>Main metrics</h1>
    <Tabs {...props} />
    {loaded && <Errors 
      data={data.get(0)}
      {...props}
    />}
    {loaded && <Actions 
      data={data.get(0)}
      {...props}
    />}
  </Fragment>
)

Main.propTypes = {
  data: PropTypes.object, 
  errors_yesterday: PropTypes.object, 
  errors_last_hour: PropTypes.object,
  errors_last_3days: PropTypes.object,
  loaded: PropTypes.bool,
  setTab: PropTypes.func
}

export default compose(
  connect(
    ({ data }) => ({
      loaded: data.loaded,
      errors_last_3days: data.errors_last_3days,
      errors_last_hour: data.errors_last_hour,
      errors_yesterday: data.errors_yesterday,
      data: data.entities
    }), 
    { fetchData }
  ),
  lifecycle({
    componentDidMount() {
      const { fetchData, loaded } = this.props
      if (!loaded) fetchData()
    }
  }),
  withState('tab', 'setTab', 'yesterday'),
  withHandlers({
    setTab: ({ setTab }) => (tab) => e => {
      e.preventDefault()
      setTab(tab)
    }
  })
)(Main)