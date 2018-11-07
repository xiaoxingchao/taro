import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import {ADD,MINUS} from '../constants/counter'

const add = ADD;
const minus = MINUS;

export default createReducer(fromJS({
  num: 0
}),{
  [add]: (state) => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num + 1
    })
  },
  [minus]: (state) => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num - 1
    })
  }
})