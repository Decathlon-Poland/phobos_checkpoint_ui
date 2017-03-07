import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import FailureOverview, { formatEventTime } from 'components/failure/overview'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const mountComponent = (props) => mount(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <FailureOverview {...props} />
  </MuiThemeProvider>
)

describe('<FailureOverview />', () => {
  let props, component

  beforeEach(() => {
    jasmineEnzyme()

    props = {
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

    component = mountComponent(props)
  })

  it('displays topic', () => {
    expect(component.text()).toMatch(props.topic)
  })

  it('displays group_id', () => {
    expect(component.text()).toMatch(props.group_id)
  })

  it('displays entity_id', () => {
    expect(component.text()).toMatch(props.entity_id)
  })

  it('displays event_time formatted', () => {
    expect(component.text()).toMatch(formatEventTime(props.event_time))
  })

  it('displays event_type', () => {
    expect(component.text()).toMatch(props.event_type)
  })

  it('displays event_version', () => {
    expect(component.text()).toMatch(props.event_version)
  })

  it('displays checksum', () => {
    expect(component.text()).toMatch(props.checksum)
  })

  it('displays error_class', () => {
    expect(component.text()).toMatch(props.error_class)
  })

  it('displays error_message', () => {
    expect(component.text()).toMatch(props.error_message)
  })

  it('displays error_backtrace', () => {
    const errorBacktraceFormatted = JSON.stringify(props.error_backtrace, null, '  ')
    expect(component.text()).toMatch(errorBacktraceFormatted)
  })

  it('displays payload', () => {
    const payloadFormatted = JSON.stringify(props.payload, null, '  ')
    expect(component.text()).toMatch(payloadFormatted)
  })

  it('displays metadata', () => {
    const metadataFormatted = JSON.stringify(props.metadata, null, '  ')
    expect(component.text()).toMatch(metadataFormatted)
  })
})
