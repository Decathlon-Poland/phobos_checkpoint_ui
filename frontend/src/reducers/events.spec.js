import {
  EVENT_SHOW_OVERVIEW,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENTS_SEARCH_RESULTS,
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  RECEIVE_EVENT_RETRY,
  REQUEST_EVENT_RETRY_FAILED
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

  describe('for EVENT_SHOW_RETRY', () => {
    it('sets retryVisible for the specific event to true', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: EVENT_SHOW_RETRY, event: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, retryVisible: true }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for EVENT_HIDE_RETRY', () => {
    it('sets retryVisible to false and erase errors for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2, retryVisible: true }, { id: 3 }]
      const action = { type: EVENT_HIDE_RETRY, event: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, retryVisible: false, error: null }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_EVENT_RETRY', () => {
    it('sets acknowledged and erase errors for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: RECEIVE_EVENT_RETRY, event: { id: 2 }, acknowledged: true }
      const expectedState = [{ id: 1 }, { id: 2, acknowledged: true, error: null }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENT_RETRY_FAILED', () => {
    it('sets error for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: REQUEST_EVENT_RETRY_FAILED, event: { id: 2 }, error: 'some error' }
      const expectedState = [{ id: 1 }, { id: 2, error: 'some error' }, { id: 3 }]
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
