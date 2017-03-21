import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import EventsList from 'components/events-list'
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
      <EventsList {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('<EventsList />', () => {
  let store, props, component, event

  beforeEach(() => {
    jasmineEnzyme()

    store = mockStore({
      xhrStatus: {}
    })

    event = {
      id: 1,
      topic: 'phobos.test',
      group_id: 'phobos-checkpoint-consumer',
      entity_id: 'a5dbd02d-bc40-6d15-b993-83a4825d94e6',
      event_time: '2016-09-23T21:00:40.515Z',
      event_type: 'order-placed',
      event_version: 'v1',
      checksum: '188773471ec0f898fd81d272760a027f',
      payload: { data: { name: 'phobos' } }
    }

    props = {
      events: [
        event,
        Object.assign({}, event, { id: 2 })
      ]
    }

    component = mountComponent(store, props)
  })

  it('renders the list of events', () => {
    expect(component.find('.event').length).toEqual(2)
  })
})
