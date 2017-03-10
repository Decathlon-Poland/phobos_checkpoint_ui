import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'
import { deleteFailure } from 'actions/failures'
import { hideFailureOverview } from 'actions/failures/overview'

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
  failure
})

const receiveFailureRetry = (failure, data) => ({
  type: RECEIVE_FAILURE_RETRY,
  acknowledged: data.acknowledged,
  failure
})

const requestFailureRetryFailed = (failure) => ({
  type: REQUEST_FAILURE_RETRY_FAILED,
  failure
})

export const performFailureRetry = (failure) => (dispatch, getState) => {
  dispatch(requestFailureRetry(failure))
  return API.Failure
    .retry({id: failure.id})
    .then((response) => {
      dispatch(receiveFailureRetry(failure, response.data))
      dispatch(hideFailureRetry(failure))
      dispatch(addFlashMessage({
        type: 'success',
        text: `Failure retried with success. Acknowledged: ${response.data.acknowledged}`,
        autoClose: true
      }))
      dispatch(hideFailureOverview(failure))
      dispatch(deleteFailure(failure))
    })
    .catch((response) => {
      const error = parseResponseError(response)
      dispatch(hideFailureRetry(failure))
      dispatch(addFlashMessage({
        type: 'error',
        text: `Failure retried with error: ${error.message}`,
        autoClose: false
      }))
      dispatch(requestFailureRetryFailed(failure))
    })
}
