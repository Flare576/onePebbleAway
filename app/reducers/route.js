import {CHOOSE_ROUTE, REQUEST_ROUTE, RECEIVE_ROUTE} from '../actions'

function selectedRoute(state='', action){
  switch(action.type){
    case CHOOSE_ROUTE:
      return Object.assign({}, state, action.routes)
    default:
      return state
  }
}

function stops(state={}, action) {
  switch(action.type){
    case CHOOSE_ROUTE:
    case REQUEST_ROUTE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ROUTE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.stops,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
