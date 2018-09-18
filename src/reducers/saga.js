import { all } from 'redux-saga/effects'
import { saga as dataSaga } from 'Ducks/data'

export default function * rootSaga() {
  try {
    yield all([
      dataSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}