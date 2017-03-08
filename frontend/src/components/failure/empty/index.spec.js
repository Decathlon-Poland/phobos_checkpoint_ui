import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import EmptyFailure from 'components/failure/empty'

describe('<EmptyFailure />', () => {
  let props, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      failures: [{ id: 1 }, { id: 2 }],
      isFetchingEvents: false
    }
    wrapper = shallow(<EmptyFailure {...props} />)
  })

  describe('with events', () => {
    it('does not render <EmptyFailure />', () => {
      expect(wrapper.find('.empty-failure').length).toEqual(0)
    })
  })

  describe('without events', () => {
    beforeEach(() => {
      props = {
        ...props,
        failures: []
      }
      wrapper = shallow(<EmptyFailure {...props} />)
    })

    it('renders <EmptyFailure />', () => {
      expect(wrapper.find('.empty-failure').length).toEqual(1)
    })
  })
})
