import {CHOOSE_ROUTE, REQUEST_ROUTE, RECEIVE_ROUTE} from '../actions/routes.actions'

export function routes(state={}, action) {
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
        items: action.routes,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function selectedRoute(state='', action){
  switch(action.type){
    case CHOOSE_ROUTE:
      return action.route
    default:
      return state
  }
}
