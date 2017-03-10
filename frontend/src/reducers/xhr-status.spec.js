import {
  TRIGGER_EVENTS_SEARCH,
  REQUEST_EVENTS_SEARCH_RESULTS,
  RECEIVE_EVENTS_SEARCH_RESULTS,
  REQUEST_EVENTS_SEARCH_RESULTS_FAILED,
  LOAD_MORE_EVENTS_SEARCH_RESULTS,
  TRIGGER_FAILURES_SEARCH,
  REQUEST_FAILURES_SEARCH_RESULTS,
  RECEIVE_FAILURES_SEARCH_RESULTS,
  REQUEST_FAILURES_SEARCH_RESULTS_FAILED,
  LOAD_MORE_FAILURES_SEARCH_RESULTS,
  REQUEST_FAILURE_RETRY,
  RECEIVE_FAILURE_RETRY,
  REQUEST_FAILURE_RETRY_FAILED,
  REQUEST_FAILURE_DELETE,
  RECEIVE_FAILURE_DELETE,
  REQUEST_FAILURE_DELETE_FAILED,
  REQUEST_EVENT_RETRY,
  RECEIVE_EVENT_RETRY,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

import reducer from 'reducers/xhr-status'

describe('reducers/xhr-status', () => {
  describe('for TRIGGER_EVENTS_SEARCH', () => {
    it('resets currentEventsOffset and lastEventsLoadSize', () => {
      const currentState = { currentEventsOffset: 5, lastEventsLoadSize: 10 }
      const action = { type: TRIGGER_EVENTS_SEARCH }
      const expectedState = { currentEventsOffset: 0, lastEventsLoadSize: 0 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for TRIGGER_FAILURES_SEARCH', () => {
    it('resets currentEventsOffset and lastEventsLoadSize', () => {
      const currentState = { currentEventsOffset: 5, lastEventsLoadSize: 10 }
      const action = { type: TRIGGER_FAILURES_SEARCH }
      const expectedState = { currentEventsOffset: 0, lastEventsLoadSize: 0 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENTS_SEARCH_RESULTS', () => {
    it('enables isFetchingEvents', () => {
      const currentState = { isFetchingEvents: false }
      const action = { type: REQUEST_EVENTS_SEARCH_RESULTS }
      const expectedState = { isFetchingEvents: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURES_SEARCH_RESULTS', () => {
    it('enables isFetchingEvents', () => {
      const currentState = { isFetchingEvents: false }
      const action = { type: REQUEST_FAILURES_SEARCH_RESULTS }
      const expectedState = { isFetchingEvents: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_EVENTS_SEARCH_RESULTS', () => {
    it('disables isFetchingEvents and keep the load size', () => {
      const currentState = { isFetchingEvents: true }
      const action = { type: RECEIVE_EVENTS_SEARCH_RESULTS, events: ['A', 'B', 'C'] }
      const expectedState = { isFetchingEvents: false, lastEventsLoadSize: 3 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURES_SEARCH_RESULTS', () => {
    it('disables isFetchingEvents and keep the load size', () => {
      const currentState = { isFetchingEvents: true }
      const action = { type: RECEIVE_FAILURES_SEARCH_RESULTS, failures: ['A', 'B', 'C'] }
      const expectedState = { isFetchingEvents: false, lastEventsLoadSize: 3 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENTS_SEARCH_RESULTS_FAILED', () => {
    it('disables isFetchingEvents', () => {
      const currentState = { isFetchingEvents: true }
      const action = { type: REQUEST_EVENTS_SEARCH_RESULTS_FAILED }
      const expectedState = { isFetchingEvents: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURES_SEARCH_RESULTS_FAILED', () => {
    it('disables isFetchingEvents', () => {
      const currentState = { isFetchingEvents: true }
      const action = { type: REQUEST_FAILURES_SEARCH_RESULTS_FAILED }
      const expectedState = { isFetchingEvents: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for LOAD_MORE_EVENTS_SEARCH_RESULTS', () => {
    it('updates currentEventsOffset', () => {
      const currentState = { currentEventsOffset: 0 }
      const action = { type: LOAD_MORE_EVENTS_SEARCH_RESULTS, offset: 3 }
      const expectedState = { currentEventsOffset: 3 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for LOAD_MORE_FAILURES_SEARCH_RESULTS', () => {
    it('updates currentEventsOffset', () => {
      const currentState = { currentEventsOffset: 0 }
      const action = { type: LOAD_MORE_FAILURES_SEARCH_RESULTS, offset: 3 }
      const expectedState = { currentEventsOffset: 3 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENT_RETRY', () => {
    it('enables isRetryingEvent', () => {
      const currentState = { isRetryingEvent: false }
      const action = { type: REQUEST_EVENT_RETRY }
      const expectedState = { isRetryingEvent: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURE_RETRY', () => {
    it('enables isRetryingFailure', () => {
      const currentState = { isRetryingFailure: false }
      const action = { type: REQUEST_FAILURE_RETRY }
      const expectedState = { isRetryingFailure: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURE_DELETE', () => {
    it('enables isDeletingFailure', () => {
      const currentState = { isDeletingFailure: false }
      const action = { type: REQUEST_FAILURE_DELETE }
      const expectedState = { isDeletingFailure: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_EVENT_RETRY', () => {
    it('disables isRetryingEvent', () => {
      const currentState = { isRetryingEvent: true }
      const action = { type: RECEIVE_EVENT_RETRY }
      const expectedState = { isRetryingEvent: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURE_RETRY', () => {
    it('disables isRetryingFailure', () => {
      const currentState = { isRetryingFailure: true }
      const action = { type: RECEIVE_FAILURE_RETRY }
      const expectedState = { isRetryingFailure: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURE_DELETE', () => {
    it('disables isDeletingFailure', () => {
      const currentState = { isDeletingFailure: true }
      const action = { type: RECEIVE_FAILURE_DELETE }
      const expectedState = { isDeletingFailure: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_EVENT_RETRY_FAILED', () => {
    it('disables isRetryingEvent', () => {
      const currentState = { isRetryingEvent: true }
      const action = { type: REQUEST_EVENT_RETRY_FAILED }
      const expectedState = { isRetryingEvent: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURE_RETRY_FAILED', () => {
    it('disables isRetryingFailure', () => {
      const currentState = { isRetryingFailure: true }
      const action = { type: REQUEST_FAILURE_RETRY_FAILED }
      const expectedState = { isRetryingFailure: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURE_DELETE_FAILED', () => {
    it('disables isDeletingFailure', () => {
      const currentState = { isDeletingFailure: true }
      const action = { type: REQUEST_FAILURE_DELETE_FAILED }
      const expectedState = { isDeletingFailure: false }
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
