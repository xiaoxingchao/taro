import { bindActionCreators } from 'redux'
import Taro from '@tarojs/taro'
import {
  ADD,
  MINUS,
  JDLIST,
  USERLIST
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
export const userlist = createApiAction(USERLIST, params => api.post('jsonapi/wx_app/userInfo.json', params));
export const jdlist = createApiAction(JDLIST, params => api.post('jsonapi/iwebshop_question/getA.json', params));
export default bindActionCreators({
  jdlist,
  add,
  minus,
  asyncAdd,
}, store.dispatch)
