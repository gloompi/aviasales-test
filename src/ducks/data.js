import { Record, List } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { appName, api } from 'Root/configClient'

const ReducerRecord = Record({
  entities: {},
  errors_last_3days: {},
  errors_last_hour: {},
  errors_yesterday: {},
  error: null,
  loaded: null
})

export const modulName = 'DATA'
export const FETCH_DATA_REQUEST = `${appName}/${modulName}/FETCH_DATA_REQUEST`
export const FETCH_DATA_SUCCESS = `${appName}/${modulName}/FETCH_DATA_SUCCESS`
export const FETCH_DATA_ERROR = `${appName}/${modulName}/FETCH_DATA_ERROR`

export default (state = new ReducerRecord, { 
    type, 
    payload, 
    error 
  }) => {
  switch (type) {
    case FETCH_DATA_REQUEST:
      return state.set('loaded', false)

    case FETCH_DATA_SUCCESS:
      return state
        .set('entities', new List(payload.data))
        .set('errors_last_3days', new List(payload.errors_last_3days)) 
        .set('errors_last_hour', new List(payload.errors_last_hour))
        .set('errors_yesterday', new List(payload.errors_yesterday))
        .set('loaded', true)
        .set('error', false)

    case FETCH_DATA_ERROR:
      return state
        .set('loaded', true)
        .set('error', error)

    default:
      return state
  }
}

export const fetchData = () => ({ type: FETCH_DATA_REQUEST })

const fetchDataSaga = function * () {
  try {
    const { data } = yield call(axios, api)
    yield put({
      type: FETCH_DATA_SUCCESS,
      payload: data
    })
  } catch (error) {
    yield put({
      type: FETCH_DATA_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga)
}