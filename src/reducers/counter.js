import { ADD, MINUS, LIST, CHECKTOKEN } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  list:[],
  checkToken:false,
  JDLIST:{}
}

export default function counter (state = INITIAL_STATE, action) {
  console.log('action', action)
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
    case LIST:
      let data = state.list.concat(action.payload.data)
      // Object.assign(state.list, action.payload.data.news)
      console.log('data',data)
      console.log('state',state)
       return {
         ...state,
        //  list: action.payload.data.news
         list: data
       }
    case CHECKTOKEN:
       console.log('action.payload',action.payload);
      //  let data = state.checkToken.concat(action.payload.data)
      //  // Object.assign(state.list, action.payload.data.news)
      //  console.log('data',data)
      //  console.log('state',state)
        return {
          ...state,
          ...action.payload
          // ...{checkToken:true}
         //  list: action.payload.data.news
          // list: data
        }
      default:
        let p={};
        p[action.type] = action.payload;
        return {
          ...state,
          ...p
        }
  }
}
