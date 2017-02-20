import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import { EventsSearch } from 'views/events-search'
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
      <EventsSearch {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('view <EventsSearch />', () => {
  let props, component, store

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
      changeSearchInputFilterType: jasmine.createSpy('changeSearchInputFilterType'),
      changeSearchInputFilterValue: jasmine.createSpy('changeSearchInputFilterValue'),
      showEventOverview: jasmine.createSpy('showEventOverview'),

      xhrStatus: { isFetchingEvents: false, lastEventsLoadSize: 0 },
      location: { query: {} },
      eventsFilters: {},
      events: [{ id: 1 }, { id: 2 }]
    }

    component = mountComponent(store, props)
  })

  it('renders <SearchInput />', () => {
    expect(component.find('.search-input').length).toEqual(1)
  })

  it('renders <EventsList />', () => {
    expect(component.find('.events-list').length).toEqual(1)
  })

  it('does not render <EventsSearch.EmptyEvent />', () => {
    expect(component.find('.empty-event').length).toEqual(0)
  })

  describe('when it initializes with filter type and value', () => {
    beforeEach(() => {
      Object.assign(props, {
        location: { query: {
          type: 'entity_id',
          value: '12345'
        }}
      })

      component = mountComponent(store, props)
    })

    it('calls changeSearchInputFilterType with type', () => {
      expect(props.changeSearchInputFilterType).toHaveBeenCalledWith('entity_id')
    })

    it('calls changeSearchInputFilterValue with value', () => {
      expect(props.changeSearchInputFilterValue).toHaveBeenCalledWith('12345')
    })
  })

  describe('when events is empty', () => {
    beforeEach(() => {
      Object.assign(props, { events: [] })
      component = mountComponent(store, props)
    })

    it('calls fetchSearchResults with offset 0', () => {
      expect(props.fetchSearchResults).toHaveBeenCalledWith({ offset: 0 })
    })

    it('renders <EventsSearch.EmptyEvent />', () => {
      expect(component.find('.empty-event').length).toEqual(1)
    })
  })
})
