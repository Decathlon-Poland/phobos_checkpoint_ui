import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from 'actions'
import { addFlashMessage, deleteFlashMessage } from 'actions/flash-messages'

describe('actions/flash-messages', () => {
  describe('#addFlashMessage', () => {
    it('creates an action to add flash messags auto generating the id', () => {
      const message = { type: 'success', text: 'congrats!' }
      const expectedAction = {
        type: ADD_FLASH_MESSAGE,
        message: Object.assign({ id: jasmine.any(String) }, message)
      }
      expect(addFlashMessage(message)).toEqual(expectedAction)
    })
  })

  describe('#addFlashMessage', () => {
    it('creates an action to delete flash messags', () => {
      const id = '1'
      const expectedAction = { type: DELETE_FLASH_MESSAGE, id: id }
      expect(deleteFlashMessage(id)).toEqual(expectedAction)
    })
  })
})
