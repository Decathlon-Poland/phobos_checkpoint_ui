import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import LoadMore from 'components/load-more'
import { EVENTS_SEARCH_LIMIT } from 'api'

import RaisedButton from 'material-ui/RaisedButton'

describe('<LoadMore />', () => {
  let props, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      loadMoreSearchResults: jasmine.createSpy('loadMoreSearchResults'),
      xhrStatus: {
        lastEventsLoadSize: 1
      }
    }
  })

  describe('when events loaded equals event search limit', () => {
    beforeEach(() => {
      props = {
        ...props,
        xhrStatus: {
          lastEventsLoadSize: EVENTS_SEARCH_LIMIT
        }
      }
      wrapper = shallow(<LoadMore {...props} />)
    })

    it('renders the load more button', () => {
      expect(wrapper.find(RaisedButton).length).toEqual(1)
    })
  })

  describe('when events loaded are less than event search limit', () => {
    beforeEach(() => {
      props = {
        ...props,
        xhrStatus: {
          lastEventsLoadSize: EVENTS_SEARCH_LIMIT - 1
        }
      }
      wrapper = shallow(<LoadMore {...props} />)
    })

    it('does not render the load more button', () => {
      expect(wrapper.find(RaisedButton).length).toEqual(0)
    })
  })
})
