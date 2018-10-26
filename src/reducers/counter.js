import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { ADD, MINUS,ISLOAD } from '../constants/counter'

export default createReducer(fromJS({
  num: 0,
  Y:'你好',
  isload:true
}),{
  [ADD]: (state) => {
    const counterState = state.toJS();
    console.log(counterState);
    return state.merge({
      num: counterState.num + 1,
      name:'破佛顶山减肥呢'
    })
  },
  [MINUS]: (state) => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num - 1
    })
  },
  [ISLOAD]: (state) => {
    const counterState = state.toJS()
    return state.merge({
      isload: false,
      num: counterState.num - 1
    })
  },
})