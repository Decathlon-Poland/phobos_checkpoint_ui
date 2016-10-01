import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from 'actions'

import reducer from 'reducers/flash-messages'

describe('reducers/flash-messages', () => {
  describe('for ADD_FLASH_MESSAGE', () => {
    it('adds a new message', () => {
      const currentState = []
      const action = { type: ADD_FLASH_MESSAGE, message: { id: 1, type: 'success' } }
      const expectedState = [action.message]
      expect(reducer(currentState, action)).toEqual(expectedState)
    })
  })

  describe('for DELETE_FLASH_MESSAGE', () => {
    it('deletes the message by id', () => {
      const currentState = [{ id: 1, type: 'success' }, { id: 2, type: 'error' }]
      const action = { type: DELETE_FLASH_MESSAGE, id: 2 }
      const expectedState = [{ id: 1, type: 'success' }]
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
