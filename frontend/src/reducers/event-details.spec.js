import {
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENT_DETAILS
} from 'actions'

import reducer from 'reducers/event-details'

describe('reducers/events-details', () => {
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

  describe('for default', () => {
    it('returns the currentState', () => {
      const currentState = { current: true }
      const action = { type: 'another' }
      expect(reducer(currentState, action)).toEqual(currentState)
    })
  })
})
