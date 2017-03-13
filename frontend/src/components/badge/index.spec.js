import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Badge from 'components/badge'

const mountComponent = (props) => mount(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Badge {...props} />
  </MuiThemeProvider>
)

describe('<Badge />', () => {
  let props, component

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      text: 7,
      loading: false
    }
  })

  it('renders <Badge />', () => {
    component = mountComponent(props)
    expect(component.find('.badge').length).toEqual(1)
  })

  it('renders text without spinner', () => {
    component = mountComponent(props)
    expect(component.find('.badge').text()).toEqual('7')
    expect(component.find('.page-loader').length).toEqual(0)
  })

  describe('when loading', () => {
    beforeEach(() => {
      props = { ...props, loading: true }
    })

    it('renders spinner without text', () => {
      component = mountComponent(props)
      expect(component.find('.badge').text()).toEqual('')
      expect(component.find('.page-loader').length).toEqual(1)
    })
  })
})
