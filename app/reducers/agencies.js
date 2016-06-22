import {REQUEST_AGENCIES, RECEIVE_AGENCIES} from '../actions'

function agencies(state={}, action){
  switch(action.type){
    case REQUEST_AGENCIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_AGENCIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.agencies,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
