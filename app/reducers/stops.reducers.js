import {REQUEST_STOPS, RECEIVE_STOPS, CHOOSE_STOP, CREATE_PEBBLE_GROUP, ADD_STOP_TO_PEBBLE_GROUP} from '../actions/stops.actions'

export function stops(state={}, action) {
  switch(action.type){
    case CHOOSE_STOP:
    case REQUEST_STOPS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_STOPS:
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

export function selectedStop(state='', action){
  switch(action.type){
    case CHOOSE_STOP:
      return Object.assign({}, state, action.stop)
    default:
      return state
  }
}

export function pebbleStopSets(state=[], action){
  switch(action.type){
    case CREATE_PEBBLE_GROUP:
      return [...state,{
        name: action.name,
        routeStops: []
      }
      ]
    case ADD_STOP_TO_PEBBLE_GROUP:
      return state.map( (group, index) => {
        if (index == action.groupId) {
          return Object.assign({}, group, {
            routeStops:[...routeStops, {
              route: action.route,
              stop: action.stop,
              manualOffset: action.manualOffset
            }
            ]
          })
        } else{
          return group
        }
      })
    default: return state
  }
}
