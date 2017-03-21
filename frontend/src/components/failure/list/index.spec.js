import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import FailuresList from 'components/failure/list'
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
      <FailuresList {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('<FailuresList />', () => {
  let store, props, component, failure

  beforeEach(() => {
    jasmineEnzyme()

    store = mockStore({
      xhrStatus: {}
    })

    failure = {
      id: 1,
      topic: 'phobos.test',
      group_id: 'phobos-checkpoint-consumer',
      entity_id: 'a5dbd02d-bc40-6d15-b993-83a4825d94e6',
      event_time: '2016-09-23T21:00:40.515Z',
      event_type: 'order-placed',
      event_version: 'v1',
      checksum: '188773471ec0f898fd81d272760a027f',
      payload: { data: { name: 'phobos' } },
      metadata: { meta: { version: 'foo' } },
      error_class: 'FooError',
      error_message: 'Expected "foo" to equal "bar"',
      error_backtrace: ['Line 1: foo', 'Line 2: baz']
    }

    props = {
      failures: [
        failure,
        Object.assign({}, failure, { id: 2 })
      ]
    }

    component = mountComponent(store, props)
  })

  it('renders the list of failures', () => {
    expect(component.find('.failure').length).toEqual(2)
  })
})
