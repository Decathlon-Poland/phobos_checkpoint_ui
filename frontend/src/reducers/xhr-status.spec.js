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
  REQUEST_FAILURE_COUNT,
  RECEIVE_FAILURE_COUNT,
  REQUEST_FAILURE_COUNT_FAILED
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

  describe('for REQUEST_FAILURE_COUNT', () => {
    it('enables isFetchingFailureCount', () => {
      const currentState = { isFetchingFailureCount: false }
      const action = { type: REQUEST_FAILURE_COUNT }
      const expectedState = { isFetchingFailureCount: true }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURE_COUNT', () => {
    it('disables isFetchingFailureCount', () => {
      const currentState = { isFetchingFailureCount: true, fetchFailureCountFailed: true }
      const action = { type: RECEIVE_FAILURE_COUNT }
      const expectedState = { isFetchingFailureCount: false, fetchFailureCountFailed: false }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for REQUEST_FAILURE_COUNT_FAILED', () => {
    it('disables isFetchingFailureCount', () => {
      const currentState = { isFetchingFailureCount: true, fetchFailureCountFailed: false }
      const action = { type: REQUEST_FAILURE_COUNT_FAILED }
      const expectedState = { isFetchingFailureCount: false, fetchFailureCountFailed: true }
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
