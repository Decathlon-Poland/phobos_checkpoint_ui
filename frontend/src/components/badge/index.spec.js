import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import Badge from 'components/badge'

describe('<Badge />', () => {
  let props, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      text: '7'
    }
    wrapper = shallow(<Badge {...props} />)
  })

  it('renders <Badge />', () => {
    expect(wrapper.find('.badge').length).toEqual(1)
  })

  it('renders text', () => {
    expect(wrapper.find('.badge').text()).toEqual('7')
  })
})
