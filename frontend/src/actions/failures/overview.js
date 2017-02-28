import {
  FAILURE_SHOW_OVERVIEW,
  FAILURE_HIDE_OVERVIEW
} from 'actions'

export const showFailureOverview = (failure) => ({
  type: FAILURE_SHOW_OVERVIEW,
  failure
})

export const hideFailureOverview = (failure) => ({
  type: FAILURE_HIDE_OVERVIEW,
  failure
})
