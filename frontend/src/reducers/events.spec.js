import {
  EVENT_SHOW_OVERVIEW,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENTS_SEARCH_RESULTS
} from 'actions'

import reducer from 'reducers/events'

describe('reducers/events', () => {
  describe('for EVENT_SHOW_OVERVIEW', () => {
    it('sets overviewVisible for the specific event to true', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: EVENT_SHOW_OVERVIEW, event: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, overviewVisible: true }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for EVENT_HIDE_OVERVIEW', () => {
    it('sets overviewVisible to false and erase errors for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2, overviewVisible: true }, { id: 3 }]
      const action = { type: EVENT_HIDE_OVERVIEW, event: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, overviewVisible: false, error: null }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_EVENTS_SEARCH_RESULTS', () => {
    describe('when offset less or equal to 0', () => {
      it('overrides events with action events', () => {
        const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const action = { type: RECEIVE_EVENTS_SEARCH_RESULTS, offset: 0, events: [{ id: 4 }] }
        const expectedState = [{ id: 4 }]
        expect(reducer(currentState, action)).toEqual(expectedState)
      })
    })

    describe('when offset is greater than 0', () => {
      it('add the new events to state', () => {
        const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const action = { type: RECEIVE_EVENTS_SEARCH_RESULTS, offset: 1, events: [{ id: 4 }] }
        const expectedState = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
        expect(reducer(currentState, action)).toEqual(expectedState)
      })
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
