import {
  FAILURE_SHOW_OVERVIEW,
  FAILURE_HIDE_OVERVIEW,
  RECEIVE_FAILURES_SEARCH_RESULTS,
  FAILURE_SHOW_RETRY,
  FAILURE_HIDE_RETRY,
  RECEIVE_FAILURE_RETRY,
  DELETE_FAILURE
} from 'actions'

import reducer from 'reducers/failures'

describe('reducers/failures', () => {
  describe('for FAILURE_SHOW_OVERVIEW', () => {
    it('sets overviewVisible for the specific event to true', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: FAILURE_SHOW_OVERVIEW, failure: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, overviewVisible: true }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for FAILURE_HIDE_OVERVIEW', () => {
    it('sets overviewVisible to false and erase errors for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2, overviewVisible: true }, { id: 3 }]
      const action = { type: FAILURE_HIDE_OVERVIEW, failure: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, overviewVisible: false, error: null }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURES_SEARCH_RESULTS', () => {
    describe('when offset less or equal to 0', () => {
      it('overrides failures with action failures', () => {
        const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const action = { type: RECEIVE_FAILURES_SEARCH_RESULTS, offset: 0, failures: [{ id: 4 }] }
        const expectedState = [{ id: 4 }]
        expect(reducer(currentState, action)).toEqual(expectedState)
      })
    })

    describe('when offset is greater than 0', () => {
      it('add the new failures to state', () => {
        const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const action = { type: RECEIVE_FAILURES_SEARCH_RESULTS, offset: 1, failures: [{ id: 4 }] }
        const expectedState = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
        expect(reducer(currentState, action)).toEqual(expectedState)
      })
    })
  })

  describe('for FAILURE_SHOW_RETRY', () => {
    it('sets retryVisible for the specific event to true', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: FAILURE_SHOW_RETRY, failure: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, retryVisible: true }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for FAILURE_HIDE_RETRY', () => {
    it('sets retryVisible to false and erase errors for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2, retryVisible: true }, { id: 3 }]
      const action = { type: FAILURE_HIDE_RETRY, failure: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 2, retryVisible: false, error: null }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for RECEIVE_FAILURE_RETRY', () => {
    it('sets acknowledged and erase errors for a specific', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: RECEIVE_FAILURE_RETRY, failure: { id: 2 }, acknowledged: true }
      const expectedState = [{ id: 1 }, { id: 2, acknowledged: true, error: null }, { id: 3 }]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for DELETE_FAILURE', () => {
    it('removes the given failure from state', () => {
      const currentState = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const action = { type: DELETE_FAILURE, failure: { id: 2 } }
      const expectedState = [{ id: 1 }, { id: 3 }]
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
