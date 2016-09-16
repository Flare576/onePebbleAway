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
    selectedPebbleStopSet: stops.selectedPebbleStopSet(state.selectedPebbleStopSet, action),
    selectedStop: stops.selectedStop(state.selectedStop, action)
  }
}
