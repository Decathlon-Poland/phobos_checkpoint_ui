import {
  RECEIVE_FAILURE_COUNT
} from 'actions'

import reducer from 'reducers/dashboard'

describe('reducers/dashboard', () => {
  describe('for RECEIVE_FAILURE_COUNT', () => {
    it('sets overviewVisible for the specific event to true', () => {
      const currentState = {}
      const action = { type: RECEIVE_FAILURE_COUNT, data: 8 }
      const expectedState = { failureCount: 8 }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })
})
