import {CHOOSE_AGENCY, REQUEST_AGENCY, RECEIVE_AGENCY} from '../actions'

function selectedAgency(state='', action){
  switch(action.type){
    case CHOOSE_AGENCY:
      return Object.assign({}, state, action.agency)
    default:
      return state
  }
}

function routes(state={}, action) {
  switch(action.type){
    case CHOOSE_AGENCY:
    case REQUEST_AGENCY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_AGENCY:
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
