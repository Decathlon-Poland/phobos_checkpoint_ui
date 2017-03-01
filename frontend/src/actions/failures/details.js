import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'

import {
  REQUEST_FAILURE_DETAILS,
  RECEIVE_FAILURE_DETAILS,
  REQUEST_FAILURE_DETAILS_FAILED
} from 'actions'

const requestFailureDetails = (failure) => ({
  type: REQUEST_FAILURE_DETAILS,
  failure
})

const receiveFailureDetails = (failure) => ({
  type: RECEIVE_FAILURE_DETAILS,
  failure
})

const requestFailureDetailsFailed = (failure, error) => ({
  type: REQUEST_FAILURE_DETAILS_FAILED,
  failure,
  error
})

export const fetchFailureDetails = (failure) => (dispatch, getState) => {
  dispatch(requestFailureDetails(failure))

  return API.Failure
    .findById({ id: failure.id })
    .then((response) => dispatch(receiveFailureDetails(response.data)))
    .catch((response) => {
      const error = parseResponseError(response)
      dispatch(requestFailureDetailsFailed(failure, error.message))
      dispatch(addFlashMessage({
        type: 'error',
        text: error.message
      }))
    })
}
