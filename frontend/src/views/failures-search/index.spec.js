import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount, shallow } from 'enzyme'
import { FailuresSearch } from 'views/failures-search'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SearchInput from 'components/search-input'
import FailuresList from 'components/failures-list'
import EmptyEvent from 'components/empty-event'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mountComponent = (store, props) => mount(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <FailuresSearch {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('view <FailuresSearch />', () => {
  let props, store, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    store = mockStore({
      xhrStatus: {
        isRetryingEvent: false
      }
    })

    props = {
      fetchSearchResults: jasmine.createSpy('fetchSearchResults'),
      loadMoreSearchResults: jasmine.createSpy('loadMoreSearchResults'),
      triggerSearch: jasmine.createSpy('triggerSearch'),
      changeSearchInputFilterType: jasmine.createSpy('changeSearchInputFilterType'),
      changeSearchInputFilterValue: jasmine.createSpy('changeSearchInputFilterValue'),
      showEventOverview: jasmine.createSpy('showEventOverview'),

      xhrStatus: { isFetchingEvents: false, lastEventsLoadSize: 0 },
      location: { pathname: '', query: {} },
      eventsFilters: {
        type: 'foo',
        value: 'bar'
      },
      failures: [{ id: 1 }, { id: 2 }]
    }

    wrapper = shallow(<FailuresSearch {...props} />)
  })

  it('renders <SearchInput />', () => {
    expect(wrapper.contains(
      <SearchInput triggerSearch={props.triggerSearch} filterType={props.eventsFilters.type} filterValue={props.eventsFilters.value} />)
    ).toEqual(true)
  })

  it('renders <FailuresList />', () => {
    expect(wrapper.contains(<FailuresList failures={props.failures} />)).toEqual(true)
  })

  it('renders <EmptyEvent />', () => {
    expect(wrapper.contains(<EmptyEvent events={props.failures} isFetchingEvents={props.xhrStatus.isFetchingEvents} />)).toEqual(true)
  })

  describe('when it initializes with filter type and value', () => {
    beforeEach(() => {
      props = {
        ...props,
        location: {
          pathname: '/failures',
          query: {
            type: 'entity_id',
            value: '12345'
          }
        }
      }

      mountComponent(store, props)
    })

    it('calls changeSearchInputFilterType with type', () => {
      expect(props.changeSearchInputFilterType).toHaveBeenCalledWith('entity_id')
    })

    it('calls changeSearchInputFilterValue with value', () => {
      expect(props.changeSearchInputFilterValue).toHaveBeenCalledWith('12345')
    })
  })

  describe('when events are empty', () => {
    beforeEach(() => {
      props = {...props, failures: []}
      mountComponent(store, props)
    })

    it('calls fetchSearchResults with offset 0', () => {
      expect(props.fetchSearchResults).toHaveBeenCalledWith({ offset: 0 })
    })
  })
})
