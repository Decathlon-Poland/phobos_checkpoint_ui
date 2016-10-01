import {
  SEARCH_INPUT_CHANGE_FILTER_TYPE,
  SEARCH_INPUT_CHANGE_FILTER_VALUE
} from 'actions'

import reducer from 'reducers/events-filters'

describe('reducers/events-filters', () => {
  describe('for SEARCH_INPUT_CHANGE_FILTER_TYPE', () => {
    it('sets type', () => {
      const currentState = { type: 'foo' }
      const action = { type: SEARCH_INPUT_CHANGE_FILTER_TYPE, filterType: 'bar' }
      const expectedState = { type: 'bar' }
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for SEARCH_INPUT_CHANGE_FILTER_VALUE', () => {
    it('sets type', () => {
      const currentState = { value: 'foo' }
      const action = { type: SEARCH_INPUT_CHANGE_FILTER_VALUE, filterValue: 'bar' }
      const expectedState = { value: 'bar' }
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
