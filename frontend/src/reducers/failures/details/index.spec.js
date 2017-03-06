import {
  FAILURE_SHOW_RETRY,
  FAILURE_HIDE_RETRY,
  FAILURE_HIDE_OVERVIEW,
  RECEIVE_FAILURE_DETAILS,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

import reducer from 'reducers/failures/details'

describe('reducers/failures/details', () => {
  describe('for FAILURE_SHOW_RETRY', () => {
    it('sets retryVisible to true', () => {
      const currentState = { id: 1 }
      const action = { type: FAILURE_SHOW_RETRY, failure: { id: 1 } }
      const expectedState = { id: 1, retryVisible: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for FAILURE_HIDE_RETRY', () => {
    it('sets retryVisible to false', () => {
      const currentState = { id: 1 }
      const action = { type: FAILURE_HIDE_RETRY, failure: { id: 1 } }
      const expectedState = { id: 1, retryVisible: false, error: null }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for FAILURE_HIDE_OVERVIEW', () => {
    it('erases the state', () => {
      const currentState = { id: 1 }
      const action = { type: FAILURE_HIDE_OVERVIEW, failure: { id: 1 } }
      const expectedState = { }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURE_DETAILS', () => {
    it('replaces the state', () => {
      const currentState = { id: 1 }
      const action = { type: RECEIVE_FAILURE_DETAILS, failure: { id: 2 } }
      const expectedState = { id: 2 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENT_RETRY_FAILED', () => {
    it('replaces the state', () => {
      const currentState = { id: 1 }
      const action = { type: REQUEST_EVENT_RETRY_FAILED, error: 'an error', failure: { id: 2 } }
      const expectedState = { id: 1, error: 'an error' }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for default', () => {
    it('returns the currentState', () => {
      const currentState = { current: true }
      const action = { type: 'another' }
      expect(reducer(currentState, action)).toEqual(currentState)
    })
  })
})
