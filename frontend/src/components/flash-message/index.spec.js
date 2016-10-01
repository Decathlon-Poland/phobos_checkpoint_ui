import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'
import FlashMessage, { AUTO_CLOSE_TIMEOUT } from 'components/flash-message'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const mountComponent = (props) => mount(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <FlashMessage {...props} />
  </MuiThemeProvider>
)

describe('<FlashMessage />', () => {
  let props, component, onClose

  beforeEach(() => {
    jasmineEnzyme()
    jasmine.clock().install()
    onClose = jasmine.createSpy('onClose')

    props = {
      id: '1',
      type: 'success',
      text: 'lorem ipsum',
      onClose: onClose
    }
    component = mountComponent(props)
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('displays the message with the correct type', () => {
    expect(component.text()).toMatch(props.text)
    expect(component.find(`.flash-message.${props.type}`).length).toEqual(1)
  })

  describe('when X is clicked', () => {
    it('calls onClose', () => {
      component.find('.close').simulate('click')
      expect(onClose).toHaveBeenCalledWith(props.id)
    })
  })

  describe('with autoClose = true', () => {
    beforeEach(() => {
      Object.assign(props, { autoClose: true })
      component = mountComponent(props)
    })

    it('calls onClose after AUTO_CLOSE_TIMEOUT time', () => {
      expect(onClose).not.toHaveBeenCalled()
      jasmine.clock().tick(AUTO_CLOSE_TIMEOUT)
      expect(onClose).toHaveBeenCalledWith(props.id)
    })
  })
})
