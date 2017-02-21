import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import EmptyEvent from 'components/empty-event'

describe('<EmptyEvent />', () => {
  let props, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      events: [{ id: 1 }, { id: 2 }],
      isFetchingEvents: false
    }
    wrapper = shallow(<EmptyEvent {...props} />)
  })

  describe('with events', () => {
    it('does not render <EmptyEvent />', () => {
      expect(wrapper.find('.empty-event').length).toEqual(0)
    })
  })

  describe('without events', () => {
    beforeEach(() => {
      props = {
        ...props,
        events: []
      }
      wrapper = shallow(<EmptyEvent {...props} />)
    })

    it('renders <EmptyEvent />', () => {
      expect(wrapper.find('.empty-event').length).toEqual(1)
    })
  })
})
