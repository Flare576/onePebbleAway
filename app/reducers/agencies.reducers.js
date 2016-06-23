import {REQUEST_AGENCIES, RECEIVE_AGENCIES, CHOOSE_AGENCY} from '../actions/agencies.actions'

export function agencies(state={}, action){
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

export function selectedAgency(state='', action){
  switch(action.type){
    case CHOOSE_AGENCY:
      return Object.assign({}, state, action.agency)
    default:
      return state
  }
}
