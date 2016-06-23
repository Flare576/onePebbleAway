//import fetch from 'isomorphic-fetch'
import {buildURL, shouldFetchGeneral} from '../common/ajaxTools'

export const REQUEST_AGENCIES = 'REQUEST_AGENCIES'
export const RECEIVE_AGENCIES = 'RECEIVE_AGENCIES'
export const CHOOSE_AGENCY = 'CHOOSE_AGENCY'

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

export function fetchAgenciesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAgencies(getState())) {
      dispatch(fetchAgencies())
    } else{
      Promise.resolve()
    }
  }
}

function fetchAgencies(){
  return (dispatch) => {
    dispatch(requestAgencies())
    return fetch(buildURL('agencies-with-coverage.json'))
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAgencies(json))
      )
  }
}

function shouldFetchAgencies(state){
  return shouldFetchGeneral(state.agencies)
}
