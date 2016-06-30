import {
  REQUEST_STOP_GROUPS,
  RECEIVE_STOPS,
  RECEIVE_STOP_GROUPS,
  CHOOSE_STOP,
  CREATE_PEBBLE_GROUP,
  ADD_STOP_TO_PEBBLE_GROUP} from '../actions/stops.actions'

export function stopGroups(state={}, action) {
  switch(action.type){
    case REQUEST_STOP_GROUPS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_STOP_GROUPS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.stopGroups,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
/**
 * "1" : {}
 */
export function stops(state=[], action) {
  switch(action.type){
    case RECEIVE_STOPS:
      let newStops = {}
      action.stops.map((stop, i) => {
        newStops[stop.id] = stop
      })
      return Object.assign({}, action.stops, newStops)
    default:
      return state
  }
}

export function selectedStop(state='', action){
  switch(action.type){
    case CHOOSE_STOP:
      return action.stop
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
