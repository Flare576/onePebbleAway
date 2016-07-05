/*
import combineReducers from 'redux';
import {agencies, selectedAgency} from './agencies.reducers'
import {routes, selectedRoute} from './routes.reducers'
import {stops, pebbleStopSets, selectedStop} from './stops.reducers'

export default combineReducers({
  agencies,
  selectedAgency,
  routes,
  selectedRoute,
  stops,
  pebbleStopSets,
  selectedStop
})
*/

// import combineReducers from 'redux';
import * as agencies from './agencies.reducers'
import * as routes from './routes.reducers'
import * as stops from './stops.reducers'

export default function rootReducer(state = {}, action){
  return {
    agencies: agencies.agencies(state.agencies, action),
    selectedAgency: agencies.selectedAgency(state.selectedAgency, action),
    routes: routes.routes(state.routes, action),
    routeFilter: routes.routeFilter(state.routeFilter, action),
    selectedRoute: routes.selectedRoute(state.selectedRoute, action),
    stops: stops.stops(state.stops, action),
    stopGroups: stops.stopGroups(state.stopGroups, action),
    pebbleStopSets: stops.pebbleStopSets(state.pebbleStopSets, action),
    selectedStop: stops.selectedStop(state.selectedStop, action)
  }
}

// let allReducers = Object.assign({}, agencies, routes, stops)
// let allReducers = Object.assign({}, routes)
// let rootReducer = combineReducers(allReducers)

// export default rootReducer

// export default () => {}
