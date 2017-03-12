import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import Badge from 'components/badge'

describe('<Badge />', () => {
  let props, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      text: 7,
      loading: false
    }
  })

  it('renders <Badge />', () => {
    wrapper = shallow(<Badge {...props} />)
    expect(wrapper.find('.badge').length).toEqual(1)
  })

  it('renders text', () => {
    wrapper = shallow(<Badge {...props} />)
    expect(wrapper.find('.badge').text()).toEqual('7')
  })

  describe('when loading', () => {
    beforeEach(() => {
      props = { ...props, loading: true }
    })

    it('renders spinner', () => {
      wrapper = shallow(<Badge {...props} />)
      expect(wrapper.find('.badge').text()).toEqual('<CircularProgress />')
    })
  })
})
