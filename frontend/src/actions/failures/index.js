import {
  DELETE_FAILURE
} from 'actions'

export const deleteFailure = (failure) => ({
  type: DELETE_FAILURE,
  failure
})
