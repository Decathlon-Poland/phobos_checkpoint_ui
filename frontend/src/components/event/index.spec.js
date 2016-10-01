import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import { Event } from 'components/event'
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
      <Event {...props} />
    </MuiThemeProvider>
  </Provider>
)

describe('<Event />', () => {
  let props, component, store, onShowOverview

  beforeEach(() => {
    jasmineEnzyme()
    store = mockStore({
      xhrStatus: {
        isRetryingEvent: false
      }
    })

    onShowOverview = jasmine.createSpy('onShowOverview')

    props = {
      onShowOverview: onShowOverview,
      event: {
        id: 1,
        topic: 'phobos.test',
        group_id: 'phobos-checkpoint-consumer',
        entity_id: 'a5dbd02d-bc40-6d15-b993-83a4825d94e6',
        event_time: '2016-09-23T21:00:40.515Z',
        event_type: 'order-placed',
        event_version: 'v1',
        checksum: '188773471ec0f898fd81d272760a027f',
        payload: '{ "data": { "name": "phobos" } }'
      }
    }

    component = mountComponent(store, props)
  })

  it('displays event_time formatted', () => {
    expect(component.text()).toMatch('September 23rd 2016, 11:00:40 pm')
  })

  it('displays topic', () => {
    expect(component.text()).toMatch('phobos.test')
  })

  it('displays event_type', () => {
    expect(component.text()).toMatch('order-placed')
  })

  describe('when clicked', () => {
    it('calls onShowOverview with the event', () => {
      component.find('.event').simulate('click')
      expect(onShowOverview).toHaveBeenCalledWith(props.event)
    })
  })

  describe('when event has overviewVisible=true', () => {
    let dialog
    beforeEach(() => {
      Object.assign(props.event, { overviewVisible: true })
      component = mountComponent(store, props)
      const dialogs = document.getElementsByClassName('event-overview-dialog')
      dialog = dialogs[dialogs.length - 1]
    })

    it('opens the event overview dialog', () => {
      expect(dialog).not.toBe(null)
    })

    it('displays event_id', () => {
      expect(dialog.innerText).toMatch(`#${props.event.id}`)
    })
  })
})
