import {
  CHOOSE_ROUTE,
  REQUEST_ROUTE,
  RECEIVE_ROUTE,
  FILTER_ROUTE} from '../actions/routes.actions'

export function routes(state={}, action) {
  switch(action.type){
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

export function routeFilter(state='', action){
  switch (action.type){
    case FILTER_ROUTE:
      return action.filter
    default:
      return state
  }
}
