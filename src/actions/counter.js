import { bindActionCreators } from 'redux'
import Taro from '@tarojs/taro'
import {
  ADD,
  LIST,
  MINUS,
  CHECKTOKEN,
} from '../constants/counter'
import store from '../store'
import { createApiAction } from './index'
import api from '../service/api'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
export function asyncAdd() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
// 请求api
export const list = createApiAction(LIST, params => api.get('/issues', params))
export const checkToken = createApiAction(CHECKTOKEN, params => api.post('app_applet/checkToken', params))
export default bindActionCreators({
  list,
  add,
  minus,
  asyncAdd,
  checkToken
}, store.dispatch)
