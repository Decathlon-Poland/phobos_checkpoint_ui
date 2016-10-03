import Mappersmith from 'mappersmith'

Mappersmith.Env.USE_PROMISES = true

export const EVENTS_SEARCH_LIMIT = 20

export function parseResponseError (response) {
  let error

  if (response.err) {
    const errorObj = response.err[0]
    if (errorObj.responseText) {
      try {
        error = JSON.parse(errorObj.responseText)
      } catch (e) {
        error = { message: errorObj.responseText }
      }
    }
  } else if (response.message) {
    error = response
  } else {
    error = { message: response }
  }

  return error
}

export default Mappersmith.forge({
  host: '/api/v1',
  resources: {
    Event: {
      findById: '/events/{id}',
      retry: {
        path: '/events/{id}/retry',
        method: 'POST'
      },
      search: {
        path: '/events',
        params: { limit: EVENTS_SEARCH_LIMIT }
      }
    }
  }
})
