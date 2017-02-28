import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'

import {
  FAILURE_SHOW_RETRY,
  FAILURE_HIDE_RETRY,
  REQUEST_FAILURE_RETRY,
  RECEIVE_FAILURE_RETRY,
  REQUEST_FAILURE_RETRY_FAILED
} from 'actions'

export const showFailureRetry = (failure) => ({
  type: FAILURE_SHOW_RETRY,
  failure
})

export const hideFailureRetry = (failure) => ({
  type: FAILURE_HIDE_RETRY,
  failure
})

const requestFailureRetry = (failure) => ({
  type: REQUEST_FAILURE_RETRY,
  failure: failure
})

const receiveFailureRetry = (failure, data) => ({
  type: RECEIVE_FAILURE_RETRY,
  failure: failure,
  acknowledged: data.acknowledged
})

const requestFailureRetryFailed = (failure, error) => ({
  type: REQUEST_FAILURE_RETRY_FAILED,
  failure: failure,
  error
})

export const performFailureRetry = (failure) => (dispatch, getState) => {
  dispatch(requestFailureRetry(failure))
  return API.Failure
    .retry({id: failure.id})
    .then((response) => {
      return Promise
        .resolve()
        .then(() => dispatch(receiveFailureRetry(failure, response.data)))
        .then(() => dispatch(hideFailureRetry(failure)))
        .then(() => dispatch(addFlashMessage({
          type: 'success',
          text: `Failure retried with success. Acknowledged: ${response.data.acknowledged}`,
          autoClose: true
        })))
    })
    .catch((response) => {
      const error = parseResponseError(response)
      dispatch(requestFailureRetryFailed(failure, error.message))
    })
}
