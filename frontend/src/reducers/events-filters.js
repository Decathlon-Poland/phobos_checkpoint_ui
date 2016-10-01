import { SEARCH_INPUT_CHANGE_FILTER_TYPE, SEARCH_INPUT_CHANGE_FILTER_VALUE } from 'actions'

export const DEFAULT_FILTER_TYPE = 'entity_id'
const initialState = { type: DEFAULT_FILTER_TYPE }

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE_FILTER_TYPE:
      return Object.assign({}, state, { type: action.filterType })

    case SEARCH_INPUT_CHANGE_FILTER_VALUE:
      return Object.assign({}, state, { value: action.filterValue })

    default:
      return state
  }
}
