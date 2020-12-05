import { createStore } from 'redux'
let defaultState = {
  userName:"jack",
  outDate:false
}
// state 不可变更，返回的是一个全新的值
const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'setUser':
      if(action.payload){
            // 用户过期了
        console.log('过期了')
      }
      return Object.assign({}, state, { outDate:action.payload })
    case 'toggle':
      return Object.assign({}, state, { isShow:!state.isShow })
    default:
      return state
  }
}
const store = createStore(counterReducer)
export default store