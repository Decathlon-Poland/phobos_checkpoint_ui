import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme'

import { Dashboard } from 'views/dashboard'

describe('view <Dashboard />', () => {
  let props, wrapper

  beforeEach(() => {
    jasmineEnzyme()
    props = {
      failureCount: 1
    }

    wrapper = shallow(<Dashboard {...props} />)
  })

  it('renders the dashboard', () => {
    expect(wrapper.find('.dashboard').length).toEqual(1)
  })
})
