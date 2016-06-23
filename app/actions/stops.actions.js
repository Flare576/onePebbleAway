//import fetch from 'isomorphic-fetch'
import {buildURL, shouldFetchGeneral} from '../common/ajaxTools'

export const REQUEST_STOPS = 'REQUEST_STOPS'
export const RECEIVE_STOPS = 'RECEIVE_STOPS'
export const CHOOSE_STOP = 'CHOOSE_STOP'
export const CREATE_PEBBLE_GROUP = 'CREATE_PEBBLE_GROUP'
export const ADD_STOP_TO_PEBBLE_GROUP = 'ADD_STOP_TO_PEBBLE_GROUP'
//todo need to delete pebble group and remove stop/route

export function requestStops(route){
  return {
    type: REQUEST_STOPS,
    route
  }
}

//todo need to do stops and stopGroups
export function receiveStops(route, json){
  return {
    type: RECEIVE_STOPS,
    route,
    stopGroups: json.data.entry.stopGroupings //todo: remove 'polylines' elements from json
  }
}

export function chooseStop(stop){
  return {
    type: CHOOSE_STOP,
    stop
  }
}

export function createPebbleGroup(name){
  return {
    type: CREATE_PEBBLE_GROUP,
    name
  }
}

export function addStopToPebbleGroup(groupId, route, stop, manualOffset){
  return {
    type: ADD_STOP_TO_PEBBLE_GROUP,
    groupId,
    route,
    stop,
    manualOffset
  }
}

export function fetchStopsIfNeeded(route) {
  return (dispatch, getState) => {
    if (shouldFetchStops(getState(), route)) {
      dispatch(fetchStops(route))
    } else{
      Promise.resolve()
    }
  }
}


function fetchStops(route){
  return (dispatch) => {
    dispatch(requestRoute(route))
    return fetch(buildURL('stops-for-route/{}.json', route))
      .then(response => response.json())
      .then(json =>
        dispatch(receiveStops(route, json))
      )
  }
}

function shouldFetchStops(state, route){
  return shouldFetchGeneral(state.stopGroups.items[route])
}
