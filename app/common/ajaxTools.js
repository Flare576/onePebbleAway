let oneBusAway = {
  url: 'http://api.pugetsound.onebusaway.org/api/where/',
  key: 'a4c2620d-62ff-4c62-aa2c-35a3a929bb2f'
}

export function buildURL(endpoint, pathParam){
  return oneBusAway.url + endpoint.replace('{}', pathParam) + "?key=" + oneBusAway.key
}

export function shouldFetchGeneral(thing){
  if(!thing){
    return true
  } else if (thing.isFetching){
    return false
  } else{
    return thing.didInvalidate === undefined || thing.didInvalidate
  }
}
