import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  REQUEST_EVENT_RETRY,
  RECEIVE_EVENT_RETRY,
  ADD_FLASH_MESSAGE,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

import {
  showEventRetry,
  hideEventRetry,
  performEventRetry
} from 'actions/event-retry'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/event-retry', () => {
  describe('#showEventRetry', () => {
    it('creates an action to show event retry', () => {
      const event = { id: 1 }
      const expectedAction = { type: EVENT_SHOW_RETRY, event }
      expect(showEventRetry(event)).toEqual(expectedAction)
    })
  })

  describe('#hideEventRetry', () => {
    it('creates an action to hide event retry', () => {
      const event = { id: 1 }
      const expectedAction = { type: EVENT_HIDE_RETRY, event }
      expect(hideEventRetry(event)).toEqual(expectedAction)
    })
  })

  describe('#performEventRetry', () => {
    describe('when it succeeds', () => {
      let event, store
      beforeEach(() => {
        event = { id: 1 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('post')
          .matching({ url: `/api/v1/events/${event.id}/retry` })
          .response({ acknowledged: true })
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(performEventRetry(event)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_EVENT_RETRY, event })
          expect(actions[1]).toEqual({ type: RECEIVE_EVENT_RETRY, event, acknowledged: true })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to hide the event retry', (done) => {
        store.dispatch(performEventRetry(event)).then(() => {
          const actions = store.getActions()
          expect(actions[2]).toEqual({ type: EVENT_HIDE_RETRY, event })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('create an action to add a success flash message', (done) => {
        store.dispatch(performEventRetry(event)).then(() => {
          const actions = store.getActions()
          expect(actions[3]).toEqual({ type: ADD_FLASH_MESSAGE, message: {
            id: jasmine.any(String),
            type: 'success',
            text: 'Event retried with success. Acknowledged: true',
            autoClose: true
          }})
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
          .define('post')
          .matching({ url: `/api/v1/events/${event.id}/retry` })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })

        store.dispatch(performEventRetry(event)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_EVENT_RETRY, event })
          expect(actions[1]).toEqual({ type: REQUEST_EVENT_RETRY_FAILED, event, error: 'some error' })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })
})
