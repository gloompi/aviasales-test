import { combineReducers } from 'redux'
import data from 'Ducks/data'

export default (asyncReducers) => combineReducers({
  data,
  ...asyncReducers
})
