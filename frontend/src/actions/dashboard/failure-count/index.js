import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'

import {
  REQUEST_FAILURE_COUNT,
  RECEIVE_FAILURE_COUNT,
  REQUEST_FAILURE_COUNT_FAILED
} from 'actions'

const requestFailureCount = () => ({
  type: REQUEST_FAILURE_COUNT
})

const receiveFailureCount = (data) => ({
  type: RECEIVE_FAILURE_COUNT,
  data
})

const receiveFailureCountFailed = (error) => ({
  type: REQUEST_FAILURE_COUNT_FAILED,
  error
})

export const fetchFailureCount = () => (dispatch, getState) => {
  dispatch(requestFailureCount())

  return API.Failure
    .count()
    .then((response) => dispatch(receiveFailureCount(response.data)))
    .catch((response) => {
      const error = parseResponseError(response)
      dispatch(receiveFailureCountFailed(error.message))
      dispatch(addFlashMessage({
        type: 'error',
        text: error.message
      }))
    })
}
