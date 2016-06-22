import {CHOOSE_STOP, CREATE_PEBBLE_GROUP, ADD_STOP_TO_PEBBLE_GROUP} from '../actions'

function selectedStop(state='', action){
  switch(action.type){
    case CHOOSE_STOP:
      return Object.assign({}, state, action.stop)
    default:
      return state
  }
}

function pebbleStopSets(state={}, action){
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
  }
}
