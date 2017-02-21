import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import { SearchInput, ENTER_KEY } from 'components/search-input'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mountComponent = (store, props) => mount(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <SearchInput {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('<SearchInput />', () => {
  let props, component, store

  beforeEach(() => {
    jasmineEnzyme()
    store = mockStore({})

    props = {
      onChangeFilterType: jasmine.createSpy('onChangeFilterType'),
      onChangeFilterValue: jasmine.createSpy('onChangeFilterValue'),
      triggerSearch: jasmine.createSpy('triggerSearch'),

      isFetchingEvents: false,
      filterType: 'entity_id',
      filterValue: '12345'
    }

    component = mountComponent(store, props)
  })

  it('calls onChangeFilterValue with the new value when type is changed', () => {
    component.find('input').simulate('change', { target: { value: 'new-value' } })
    expect(props.onChangeFilterValue).toHaveBeenCalledWith('new-value')
  })

  it('calls triggerSearch when ENTER is pressed in the textfield', () => {
    component.find('input').simulate('keyDown', { keyCode: ENTER_KEY })
    expect(props.triggerSearch).toHaveBeenCalled()
  })

  it('calls triggerSearch when the search button is pressed', () => {
    component.find('button').simulate('click')
    expect(props.triggerSearch).toHaveBeenCalled()
  })
})
