import fetch from 'isomorphic-fetch'
import buildURL from './common/onebusaway'

export const REQUEST_AGENCIES = 'REQUEST_AGENCIES'
export const RECEIVE_AGENCIES = 'RECEIVE_AGENCIES'
export const CHOOSE_AGENCY = 'CHOOSE_AGENCY'
export const REQUEST_AGENCY = 'REQUEST_AGENCY'
export const RECEIVE_AGENCY = 'RECEIVE_AGENCY'
export const CHOOSE_ROUTE = 'CHOOSE_ROUTE'
export const REQUEST_ROUTE = 'REQUEST_ROUTE'
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE'
export const CHOOSE_STOP = 'CHOOSE_STOP'
export const CREATE_PEBBLE_GROUP = 'CREATE_PEBBLE_GROUP'
export const ADD_STOP_TO_PEBBLE_GROUP = 'ADD_STOP_TO_PEBBLE_GROUP'
//todo need to delete pebble group and remove stop/route

//todo check 'fetching' flag, error handling with retry
export function requestAgencies(){
  return {
    type: REQUEST_AGENCIES
  }
}

export function receiveAgencies(json){
  return {
    type: RECEIVE_AGENCIES,
    agencies: json.data.references.agencies,
    receivedAt: Date.now()
  }
}

export function chooseAgency(agency){
  return {
    type: CHOOSE_AGENCY,
    agency
  }
}

export function requestAgency(agency){
  return {
    type: REQUEST_AGENCY,
    agency
  }
}

export function receiveAgency(agency, json){
  return {
    type: RECEIVE_AGENCY,
    agency,
    routes: json.data.list
  }
}

export function chooseRoute(route){
  return {
    type: CHOOSE_ROUTE,
    route
  }
}

export function requestRoute(route){
  return {
    type: REQUEST_ROUTE,
    route
  }
}

export function receiveRoute(route, json){
  return {
    type: RECEIVE_ROUTE,
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

export function fetchAgencies(){
  return (dispatch) => {
    dispatch(requestAgencies())
    return fetch(buildURL('agencies-with-coverage.json'))
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAgencies(json))
      )
  }
}

export function fetchAgency(agency){
  return (dispatch) => {
    dispatch(requestAgency(agency))
    return fetch(buildURL('routes-for-agency/{}.json', agency))
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAgency(agency, json))
      )
  }
}

export function fetchRoute(route){
  return (dispatch) => {
    dispatch(requestRoute(route))
    return fetch(buildURL('stops-for-route/{}.json', route))
      .then(response => response.json())
      .then(json =>
        dispatch(receiveRoute(route, json))
      )
  }
}

