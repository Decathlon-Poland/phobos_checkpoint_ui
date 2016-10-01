import { SEARCH_INPUT_CHANGE_FILTER_TYPE, SEARCH_INPUT_CHANGE_FILTER_VALUE } from 'actions'
import { changeSearchInputFilterType, changeSearchInputFilterValue } from 'actions/search-input-filter'

describe('actions/search-input-filter', () => {
  describe('#changeSearchInputFilterType', () => {
    it('creates an action to change the filter type', () => {
      const type = 'entity_id'
      const expectedAction = { type: SEARCH_INPUT_CHANGE_FILTER_TYPE, filterType: type }
      expect(changeSearchInputFilterType(type)).toEqual(expectedAction)
    })
  })

  describe('#changeSearchInputFilterValue', () => {
    it('creates an action to change the filter value', () => {
      const value = '123abc'
      const expectedAction = { type: SEARCH_INPUT_CHANGE_FILTER_VALUE, filterValue: value }
      expect(changeSearchInputFilterValue(value)).toEqual(expectedAction)
    })
  })
})
