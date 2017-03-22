import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import { Failure } from 'components/failure'
import { formatTime } from 'components/event/card-style'
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
      <Failure {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('<Failure />', () => {
  let props, component, store, onShowOverview

  beforeEach(() => {
    jasmineEnzyme()
    store = mockStore({
      xhrStatus: {
        isRetryingFailure: false, isDeletingFailure: false
      }
    })

    onShowOverview = jasmine.createSpy('onShowOverview')

    props = {
      onShowOverview: onShowOverview,

      failure: {
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
    }

    component = mountComponent(store, props)
  })

  it('displays event_time formatted', () => {
    expect(component.text()).toMatch(formatTime(props.failure.event_time))
  })

  it('displays topic', () => {
    expect(component.text()).toMatch('phobos.test')
  })

  it('displays event_type', () => {
    expect(component.text()).toMatch('order-placed')
  })

  describe('when clicked', () => {
    it('calls onShowOverview with the failure', () => {
      component.find('.failure').simulate('click')
      expect(onShowOverview).toHaveBeenCalledWith(props.failure)
    })
  })

  describe('when failure has overviewVisible=true', () => {
    let dialog
    beforeEach(() => {
      Object.assign(props.failure, { overviewVisible: true })
      component = mountComponent(store, props)
      const dialogs = document.getElementsByClassName('failure-overview-dialog')
      dialog = dialogs[dialogs.length - 1]
    })

    it('opens the failure overview dialog', () => {
      expect(dialog).not.toBe(null)
    })

    it('displays event_id', () => {
      expect(dialog.innerText).toMatch(`#${props.failure.id}`)
    })
  })
})
