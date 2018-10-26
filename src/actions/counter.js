import {
  ADD,
  MINUS,
  ISLOAD
} from '../constants/counter'

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
export const isload = () => {
  return {
    type: ISLOAD
  }
}
// 异步的action
export function asyncAdd () {
  // return {
  //   type: 'ggg'
  // }
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}