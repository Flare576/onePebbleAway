//import fetch from 'isomorphic-fetch'
import {buildURL, shouldFetchGeneral} from '../common/ajaxTools'

export const REQUEST_ROUTE = 'REQUEST_ROUTE'
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE'
export const CHOOSE_ROUTE = 'CHOOSE_ROUTE'

export function requestRoutes(agency){
  return {
    type: REQUEST_ROUTE,
    agency
  }
}

export function receiveRoutes(agency, json){
  return {
    type: RECEIVE_ROUTE,
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

export function fetchRoutesIfNeeded(agency){
  return (dispatch, getState) => {
    if (shouldFetchRoutes(getState(), agency)) {
      dispatch(fetchRoutes(agency))
    } else{
      Promise.resolve()
    }
  }
}

function fetchRoutes(agency){
  return (dispatch) => {
    dispatch(requestRoutes(agency))
    return fetch(buildURL('routes-for-agency/{}.json', agency))
      .then(response => response.json())
      .then(json =>
        dispatch(receiveRoutes(agency, json))
      )
  }
}

function shouldFetchRoutes(state, agency){
  return shouldFetchGeneral(state.routes[agency])
}
