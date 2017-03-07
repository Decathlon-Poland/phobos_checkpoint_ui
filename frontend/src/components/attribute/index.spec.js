import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import Attribute from 'components/attribute'

describe('<Attribute />', () => {
  let props, wrapper
  beforeEach(() => {
    jasmineEnzyme()
  })

  describe('with value', () => {
    beforeEach(() => {
      props = {
        label: 'foo',
        value: 'bar'
      }

      wrapper = shallow(<Attribute {...props} />)
    })

    it('renders an attribute wrapper div', () => {
      expect(wrapper.find('.detail').length).toEqual(1)
    })

    it('renders the label', () => {
      expect(wrapper.find('.detail > p > label').text()).toEqual('foo')
    })

    it('renders the value', () => {
      expect(wrapper.find('.detail > .value').text()).toEqual('bar')
    })
  })

  describe('without value and body', () => {
    beforeEach(() => {
      props = {
        label: 'foo'
      }

      wrapper = shallow(<Attribute {...props} />)
    })

    it('does not render anything', () => {
      expect(wrapper.find('.detail')).toBeEmpty()
    })
  })

  describe('without value, with children', () => {
    beforeEach(() => {
      props = {
        label: 'foo'
      }

      wrapper = shallow(
        <Attribute {...props}>
          <div className='inner'>
            Baz
          </div>
        </Attribute>
      )
    })

    it('renders the label', () => {
      expect(wrapper.find('.detail > p > label').text()).toEqual('foo')
    })

    it('renders the children', () => {
      expect(wrapper.find('.detail > .inner').text()).toEqual('Baz')
    })
  })

  describe('with value, with children', () => {
    beforeEach(() => {
      props = {
        label: 'foo',
        value: 'bar'
      }

      wrapper = shallow(
        <Attribute {...props}>
          <div className='inner'>
            Baz
          </div>
        </Attribute>
      )
    })

    it('renders the label', () => {
      expect(wrapper.find('.detail > p > label').text()).toEqual('foo')
    })

    it('renders the value', () => {
      expect(wrapper.find('.detail > .value').text()).toEqual('bar')
    })

    it('does not render the children', () => {
      expect(wrapper.find('.detail > .inner')).toBeEmpty()
    })
  })
})
