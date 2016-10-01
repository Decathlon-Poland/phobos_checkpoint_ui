let ids = 0

import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from 'actions'

export const addFlashMessage = (message) => ({
  type: ADD_FLASH_MESSAGE,
  message: Object.assign({ id: `${++ids}` }, message)
})

export const deleteFlashMessage = (id) => ({
  type: DELETE_FLASH_MESSAGE,
  id: id
})
