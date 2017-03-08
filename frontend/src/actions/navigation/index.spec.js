import 'babel-polyfill'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { push } from 'react-router-redux'

import { navigateTo } from 'actions/navigation'

const mockStore = configureMockStore([thunk])

describe('action navigate', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })

  it('dispatches a push event from react-router-redux', () => {
    store.dispatch(navigateTo('/foo'))
    const actions = store.getActions()
    expect(actions[0]).toEqual(push('/foo'))
  })
})
