import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import MonitorCard from 'components/dashboard/monitor-card'
import { failureCardStyle } from 'components/dashboard/monitor-card/failure-style'

const mountComponent = (props) => mount(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <MonitorCard {...props} />
  </MuiThemeProvider>
)

describe('<MonitorCard />', () => {
  let props, component

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      monitorValue: '7',
      monitorLabel: 'count',
      cardLabel: 'my label',
      cardStyle: failureCardStyle,
      hasFailed: false,
      isLoading: false
    }
  })

  it('renders <MonitorCard />', () => {
    component = mountComponent(props)
    expect(component.find('.monitor-card').length).toEqual(1)
  })

  it('renders text without spinner', () => {
    component = mountComponent(props)
    expect(component.find('.monitor--value').text()).toEqual('7')
    expect(component.find('.page-loader').length).toEqual(0)
    expect(component.find('.sync-failed').length).toEqual(0)
  })

  it('renders bar with label', () => {
    component = mountComponent(props)
    expect(component.find('.bar--text').text()).toEqual('my label')
  })

  it('renders bar with link', () => {
    component = mountComponent(props)
    expect(component.find('.bar--link').length).toEqual(1)
  })

  it('renders monitor label', () => {
    component = mountComponent(props)
    expect(component.find('.monitor--label').text()).toEqual('count')
  })

  describe('when loading', () => {
    beforeEach(() => {
      props = { ...props, isLoading: true }
    })

    it('renders spinner without text', () => {
      component = mountComponent(props)
      expect(component.find('.monitor--value').length).toEqual(0)
      expect(component.find('.page-loader').length).toEqual(1)
      expect(component.find('.sync-failed').length).toEqual(0)
    })
  })

  describe('when failed', () => {
    beforeEach(() => {
      props = { ...props, hasFailed: true }
    })

    it('renders sync failure icon with text OFFLINE', () => {
      component = mountComponent(props)
      expect(component.find('.monitor--value').text()).toEqual('OFFLINE')
      expect(component.find('.page-loader').length).toEqual(0)
      expect(component.find('.sync-failed').length).toEqual(1)
    })
  })
})
