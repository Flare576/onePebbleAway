//import fetch from 'isomorphic-fetch'
import {buildURL, shouldFetchGeneral} from '../common/ajaxTools'

export const REQUEST_STOP_GROUPS = 'REQUEST_STOP_GROUPS'
export const RECEIVE_STOP_GROUPS = 'RECEIVE_STOP_GROUPS'
export const RECEIVE_STOPS = 'RECEIVE_STOPS'
export const CHOOSE_STOP = 'CHOOSE_STOP'
export const CREATE_PEBBLE_GROUP = 'CREATE_PEBBLE_GROUP'
export const REMOVE_PEBBLE_GROUP = 'REMOVE_PEBBLE_GROUP'
export const EDIT_PEBBLE_GROUP = 'EDIT_PEBBLE_GROUP'
export const CHOOSE_PEBBLE_GROUP = 'CHOOSE_PEBBLE_GROUP'
export const ADD_STOP_TO_PEBBLE_GROUP = 'ADD_STOP_TO_PEBBLE_GROUP'
export const REMOVE_STOP_FROM_PEBBLE_GROUP = 'REMOVE_STOP_FROM_PEBBLE_GROUP'
export const EDIT_STOP_IN_PEBBLE_GROUP = 'EDIT_STOP_IN_PEBBLE_GROUP'

export function requestStopGroups(route){
  return {
    type: REQUEST_STOP_GROUPS,
    route
  }
}

export function receiveStops(route, json){
  return {
    type: RECEIVE_STOPS,
    route,
    stops: json.data.references.stops
  }
}

export function receiveStopGroups(route, json){
  return {
    type: RECEIVE_STOP_GROUPS,
    route,
    stopGroups: json.data.entry.stopGroupings[0].stopGroups
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

export function choosePebbleGroup(id){
  return {
    type: CHOOSE_PEBBLE_GROUP,
    id
  }
}

export function removePebbleGroup(id){
  return {
    type: REMOVE_PEBBLE_GROUP,
    id
  }
}

export function editPebbleGroup(id, name){
  return {
    type: EDIT_PEBBLE_GROUP,
    id,
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

export function removeStopFromPebbleGroup(groupId, route, stopId){
  return {
    type: REMOVE_STOP_FROM_PEBBLE_GROUP,
    route,
    groupId,
    stopId
  }
}

export function editStopToPebbleGroup(groupId, route, stop, manualOffset){
  return {
    type: EDIT_STOP_IN_PEBBLE_GROUP,
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
    dispatch(requestStopGroups(route))
    return fetch(buildURL('stops-for-route/{}.json', route))
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveStops(route, json))
        dispatch(receiveStopGroups(route, json))
        }
      )
  }
}

function shouldFetchStops(state, route){
  return shouldFetchGeneral(state.stopGroups[route])
}
