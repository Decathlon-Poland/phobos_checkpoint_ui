import {
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENT_DETAILS,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

import reducer from 'reducers/event-details'

describe('reducers/events-details', () => {
  describe('for EVENT_SHOW_RETRY', () => {
    it('sets retryVisible to true', () => {
      const currentState = { id: 1 }
      const action = { type: EVENT_SHOW_RETRY, event: { id: 1 } }
      const expectedState = { id: 1, retryVisible: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for EVENT_HIDE_RETRY', () => {
    it('sets retryVisible to false', () => {
      const currentState = { id: 1 }
      const action = { type: EVENT_HIDE_RETRY, event: { id: 1 } }
      const expectedState = { id: 1, retryVisible: false, error: null }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for EVENT_HIDE_OVERVIEW', () => {
    it('erases the state', () => {
      const currentState = { id: 1 }
      const action = { type: EVENT_HIDE_OVERVIEW, event: { id: 1 } }
      const expectedState = { }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_EVENT_DETAILS', () => {
    it('replaces the state', () => {
      const currentState = { id: 1 }
      const action = { type: RECEIVE_EVENT_DETAILS, event: { id: 2 } }
      const expectedState = { id: 2 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENT_RETRY_FAILED', () => {
    it('replaces the state', () => {
      const currentState = { id: 1 }
      const action = { type: REQUEST_EVENT_RETRY_FAILED, error: 'an error', event: { id: 2 } }
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
