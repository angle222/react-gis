import { createStore } from 'redux'
let defaultState = {
    name:"jack",
    isShow:false
}
const counterReducer = (state = defaultState, action) => {
     console.log(state,action)
    switch (action.type) {
        case 'setName':
           
            return Object.assign({}, state, { name:action.payload })
        case 'toggle':
            return Object.assign({}, state, { isShow:!state.isShow })
        default:
            return state
    }
}
const store = createStore(counterReducer)
export default store