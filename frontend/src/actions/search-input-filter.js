import {
  SEARCH_INPUT_CHANGE_FILTER_TYPE,
  SEARCH_INPUT_CHANGE_FILTER_VALUE
} from 'actions'

export const changeSearchInputFilterType = (filterType) => ({
  type: SEARCH_INPUT_CHANGE_FILTER_TYPE,
  filterType
})

export const changeSearchInputFilterValue = (filterValue) => ({
  type: SEARCH_INPUT_CHANGE_FILTER_VALUE,
  filterValue
})
