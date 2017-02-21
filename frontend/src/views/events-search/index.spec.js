import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount, shallow } from 'enzyme'
import { EventsSearch } from 'views/events-search'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SearchInput from 'components/search-input'
import EventsList from 'components/events-list'
import EmptyEvent from 'components/empty-event'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mountComponent = (store, props) => mount(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <EventsSearch {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('view <EventsSearch />', () => {
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
      events: [{ id: 1 }, { id: 2 }]
    }

    wrapper = shallow(<EventsSearch {...props} />)
  })

  it('renders <SearchInput />', () => {
    expect(wrapper.contains(
      <SearchInput triggerSearch={props.triggerSearch} filterType={props.eventsFilters.type} filterValue={props.eventsFilters.value} />
    )).toEqual(true)
  })

  it('renders <EventsList />', () => {
    expect(wrapper.contains(<EventsList events={props.events} />)).toEqual(true)
  })

  it('renders <EmptyEvent />', () => {
    expect(wrapper.contains(<EmptyEvent events={props.events} isFetchingEvents={props.xhrStatus.isFetchingEvents} />)).toEqual(true)
  })

  describe('when it initializes with filter type and value', () => {
    beforeEach(() => {
      props = {
        ...props,
        location: {
          pathname: '/events',
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
      props = {...props, events: []}
      mountComponent(store, props)
    })

    it('calls fetchSearchResults with offset 0', () => {
      expect(props.fetchSearchResults).toHaveBeenCalledWith({ offset: 0 })
    })
  })
})
