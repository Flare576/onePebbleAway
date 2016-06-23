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

import combineReducers from 'redux';
import * as agencies from './agencies.reducers'
import * as routes from './routes.reducers'
import * as stops from './stops.reducers'

let allReducers = Object.assign({}, agencies, routes, stops)
let rootReducer = combineReducers(allReducers)

export default rootReducer

//export default () => {}
