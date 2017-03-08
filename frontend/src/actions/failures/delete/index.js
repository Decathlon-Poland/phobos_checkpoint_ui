import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'

import {
  FAILURE_SHOW_DELETE,
  FAILURE_HIDE_DELETE,
  REQUEST_FAILURE_DELETE,
  RECEIVE_FAILURE_DELETE,
  REQUEST_FAILURE_DELETE_FAILED,
  FAILURE_HIDE_OVERVIEW,
  DELETE_FAILURE
} from 'actions'

export const showFailureDelete = (failure) => ({
  type: FAILURE_SHOW_DELETE,
  failure
})

export const hideFailureDelete = (failure) => ({
  type: FAILURE_HIDE_DELETE,
  failure
})

const requestFailureDelete = (failure) => ({
  type: REQUEST_FAILURE_DELETE,
  failure
})

const receiveFailureDelete = (failure, data) => ({
  type: RECEIVE_FAILURE_DELETE,
  acknowledged: data.acknowledged,
  failure
})

const hideFailureOverview = (failure) => ({
  type: FAILURE_HIDE_OVERVIEW,
  failure
})

const deleteFailure = (failure) => ({
  type: DELETE_FAILURE,
  failure
})

const requestFailureDeleteFailed = (failure) => ({
  type: REQUEST_FAILURE_DELETE_FAILED,
  failure
})

export const performFailureDelete = (failure) => (dispatch, getState) => {
  dispatch(requestFailureDelete(failure))
  return API.Failure
    .delete({id: failure.id})
    .then((response) => {
      dispatch(receiveFailureDelete(failure, response.data))
      dispatch(hideFailureDelete(failure))
      dispatch(addFlashMessage({
        type: 'success',
        text: `Failure deleted with success. Acknowledged: ${response.data.acknowledged}`,
        autoClose: true
      }))
      dispatch(hideFailureOverview(failure))
      dispatch(deleteFailure(failure))
    })
    .catch((response) => {
      const error = parseResponseError(response)
      dispatch(hideFailureDelete(failure))
      dispatch(addFlashMessage({
        type: 'error',
        text: `Failure delete failed: ${error.message}`,
        autoClose: false
      }))
      dispatch(requestFailureDeleteFailed(failure))
    })
}
