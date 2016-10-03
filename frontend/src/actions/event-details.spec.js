import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  REQUEST_EVENT_DETAILS,
  RECEIVE_EVENT_DETAILS,
  REQUEST_EVENT_DETAILS_FAILED
} from 'actions'

import { fetchEventDetails } from 'actions/event-details'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/event-details', () => {
  describe('#fetchEventDetails', () => {
    describe('when it succeeds', () => {
      let event, store
      beforeEach(() => {
        event = { id: 1 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/events/${event.id}` })
          .response(event)
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(fetchEventDetails(event)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_EVENT_DETAILS, event })
          expect(actions[1]).toEqual({ type: RECEIVE_EVENT_DETAILS, event })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('when it fails', () => {
      it('creates REQUEST and REQUEST_FAILED actions', (done) => {
        const event = { id: 1 }
        const store = mockStore({})
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/events/${event.id}` })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })

        store.dispatch(fetchEventDetails(event)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_EVENT_DETAILS, event })
          expect(actions[1]).toEqual({ type: REQUEST_EVENT_DETAILS_FAILED, event, error: 'some error' })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })
})
